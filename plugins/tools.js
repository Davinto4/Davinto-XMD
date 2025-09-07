const crypto = require("crypto");
const qrcode = require("qrcode");

module.exports = {
  name: "Utility Tools",
  commands: [
    {
      pattern: "calc",
      desc: "Calculate math expression",
      execute: async (sock, msg, args) => {
        try {
          let expr = args.join(" ");
          let result = eval(expr);
          await sock.sendMessage(msg.chat, { text: `🧮 ${expr} = ${result}` });
        } catch {
          await sock.sendMessage(msg.chat, { text: "❌ Invalid expression" });
        }
      }
    },
    {
      pattern: "dict",
      desc: "Fake dictionary lookup",
      execute: async (sock, msg, args) => {
        let word = args[0];
        if (!word) return sock.sendMessage(msg.chat, { text: "Usage: .dict <word>" });
        await sock.sendMessage(msg.chat, { text: `📖 *${word}*: Definition not available (demo only).` });
      }
    },
    {
      pattern: "unit",
      desc: "Convert cm to inches",
      execute: async (sock, msg, args) => {
        let value = parseFloat(args[0]);
        if (!value) return sock.sendMessage(msg.chat, { text: "Usage: .unit <value in cm>" });
        let inches = (value / 2.54).toFixed(2);
        await sock.sendMessage(msg.chat, { text: `${value} cm = ${inches} inches 📏` });
      }
    },
    {
      pattern: "qrcode",
      desc: "Generate QR code",
      execute: async (sock, msg, args) => {
        let text = args.join(" ");
        if (!text) return sock.sendMessage(msg.chat, { text: "Usage: .qrcode <text>" });
        let qr = await qrcode.toBuffer(text);
        await sock.sendMessage(msg.chat, { image: qr, caption: "📲 QR Code Generated" });
      }
    },
    {
      pattern: "topdf",
      desc: "Convert text to PDF (demo)",
      execute: async (sock, msg, args) => {
        let text = args.join(" ");
        if (!text) return sock.sendMessage(msg.chat, { text: "Usage: .topdf <text>" });
        await sock.sendMessage(msg.chat, { text: `📄 PDF generated (demo only): ${text}` });
      }
    },
    {
      pattern: "encrypt",
      desc: "Encrypt text",
      execute: async (sock, msg, args) => {
        let text = args.join(" ");
        if (!text) return sock.sendMessage(msg.chat, { text: "Usage: .encrypt <text>" });
        let cipher = crypto.createHash("sha256").update(text).digest("hex");
        await sock.sendMessage(msg.chat, { text: `🔐 Encrypted: ${cipher}` });
      }
    },
    {
      pattern: "decrypt",
      desc: "Decrypt code (demo only)",
      execute: async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: "❌ Decryption not supported (hash is one-way)" });
      }
    },
    {
      pattern: "shorten",
      desc: "Shorten a URL (demo)",
      execute: async (sock, msg, args) => {
        let url = args[0];
        if (!url) return sock.sendMessage(msg.chat, { text: "Usage: .shorten <url>" });
        let short = "https://short.url/" + crypto.randomBytes(3).toString("hex");
        await sock.sendMessage(msg.chat, { text: `🔗 Shortened URL: ${short}` });
      }
    },
    {
      pattern: "expand",
      desc: "Expand URL (demo)",
      execute: async (sock, msg, args) => {
        let url = args[0];
        if (!url) return sock.sendMessage(msg.chat, { text: "Usage: .expand <url>" });
        await sock.sendMessage(msg.chat, { text: `🔗 Expanded URL (demo only): ${url}` });
      }
    },
    {
      pattern: "phone",
      desc: "Lookup phone number (fake)",
      execute: async (sock, msg, args) => {
        let num = args[0];
        if (!num) return sock.sendMessage(msg.chat, { text: "Usage: .phone <number>" });
        await sock.sendMessage(msg.chat, { text: `📞 Phone Lookup (demo): ${num} belongs to Davinto Networks 😎` });
      }
    },
    {
      pattern: "whois",
      desc: "Fake domain lookup",
      execute: async (sock, msg, args) => {
        let domain = args[0];
        if (!domain) return sock.sendMessage(msg.chat, { text: "Usage: .whois <domain>" });
        await sock.sendMessage(msg.chat, { text: `🌍 WHOIS Lookup (demo): ${domain} is active ✅` });
      }
    },
    {
      pattern: "ip",
      desc: "Fake IP lookup",
      execute: async (sock, msg, args) => {
        let ip = args[0];
        if (!ip) return sock.sendMessage(msg.chat, { text: "Usage: .ip <address>" });
        await sock.sendMessage(msg.chat, { text: `🌐 IP Lookup (demo): ${ip} is located in Nigeria 🇳🇬` });
      }
    },
    {
      pattern: "fakeid",
      desc: "Generate fake ID",
      execute: async (sock, msg) => {
        let id = crypto.randomBytes(4).toString("hex");
        await sock.sendMessage(msg.chat, { text: `🆔 Fake ID Generated: ${id}` });
      }
    },
    {
      pattern: "timer",
      desc: "Set a timer",
      execute: async (sock, msg, args) => {
        let sec = parseInt(args[0]);
        if (!sec) return sock.sendMessage(msg.chat, { text: "Usage: .timer <seconds>" });
        await sock.sendMessage(msg.chat, { text: `⏳ Timer started for ${sec} seconds...` });
        setTimeout(() => {
          sock.sendMessage(msg.chat, { text: `⏰ Time’s up!`, mentions: [msg.sender] });
        }, sec * 1000);
      }
    }
  ]
};