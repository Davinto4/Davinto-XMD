const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@adiwajshing/baileys");
const { state, saveState } = useSingleFileAuthState("./auth_info.json");
const fs = require("fs");
const path = require("path");

// Load database
const db = require("./db");

// Load utils
const utils = require("./utils");

// Load plugins dynamically
const pluginsDir = path.join(__dirname, "plugins");
const plugins = [];
fs.readdirSync(pluginsDir)
  .filter(file => file.endsWith(".js"))
  .forEach(file => {
    const plugin = require(path.join(pluginsDir, file));
    if (plugin.commands) plugins.push(...plugin.commands);
  });

// Load event handlers
const events = require("./events");

// Initialize WhatsApp socket
const sock = makeWASocket({
  auth: state,
  printQRInTerminal: true,
  patchMessageBeforeSending: (message) => {
    return message;
  }
});

// Save auth state
sock.ev.on("creds.update", saveState);

// Run events
events(sock);

// Listen for messages
sock.ev.on("messages.upsert", async (m) => {
  try {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    // Check prefix
    const prefix = ".";
    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Find command in plugins
    const command = plugins.find(c => c.pattern === commandName);
    if (!command) return;

    // Execute command
    await command.execute(sock, msg, args, db.loadDB());
  } catch (err) {
    console.error("Message handler error:", err);
  }
});

// Handle connection updates
sock.ev.on("connection.update", (update) => {
  const { connection, lastDisconnect } = update;
  if (connection === "close") {
    if ((lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
      console.log("🔄 Reconnecting...");
      index(); // Restart bot
    } else {
      console.log("❌ Connection closed. You are logged out.");
    }
  } else if (connection === "open") {
    console.log("✅ Connected as Davinto XMD");
  }
});