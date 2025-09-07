// groupHandler.js

const { getGroup, updateGroup } = require("./db");

// Check messages in groups
async function groupHandler(client, msg) {
  if (!msg.isGroup) return;

  const groupId = msg.from;
  const groupData = getGroup(groupId);

  // ✅ Antilink Protection
  if (groupData.antilink && msg.body && msg.body.match(/https?:\/\/\S+/gi)) {
    try {
      await msg.reply("⚠️ Links are not allowed in this group!");
      await msg.group.remove(msg.author);
    } catch (err) {
      console.error("❌ Failed to remove user:", err);
    }
  }
}

// ✅ Welcome / Goodbye handler
async function welcomeHandler(client, participantUpdate) {
  const groupId = participantUpdate.id.remote;
  const groupData = getGroup(groupId);

  if (participantUpdate.action === "add" && groupData.welcome) {
    await client.sendMessage(
      groupId,
      `👋 Welcome @${participantUpdate.id.user}!`,
      { mentions: [participantUpdate.id] }
    );
  }

  if (participantUpdate.action === "remove" && groupData.goodbye) {
    await client.sendMessage(
      groupId,
      `😢 Goodbye @${participantUpdate.id.user}!`,
      { mentions: [participantUpdate.id] }
    );
  }
}

// ✅ Commands to toggle features
async function handleGroupCommands(client, msg, command, args) {
  const groupId = msg.from;
  const groupData = getGroup(groupId);

  switch (command) {
    case "welcome":
      if (!args[0]) return msg.reply("📌 Usage: .welcome on/off");
      updateGroup(groupId, { welcome: args[0] === "on" });
      msg.reply(`✅ Welcome message ${args[0] === "on" ? "enabled" : "disabled"}`);
      break;

    case "goodbye":
      if (!args[0]) return msg.reply("📌 Usage: .goodbye on/off");
      updateGroup(groupId, { goodbye: args[0] === "on" });
      msg.reply(`✅ Goodbye message ${args[0] === "on" ? "enabled" : "disabled"}`);
      break;

    case "antilink":
      if (!args[0]) return msg.reply("📌 Usage: .antilink on/off");
      updateGroup(groupId, { antilink: args[0] === "on" });
      msg.reply(`✅ Antilink ${args[0] === "on" ? "enabled" : "disabled"}`);
      break;

    case "rules":
      if (!args[0]) {
        return msg.reply(groupData.rules ? `📜 Group Rules:\n${groupData.rules}` : "ℹ️ No rules set.");
      }
      updateGroup(groupId, { rules: args.join(" ") });
      msg.reply("✅ Group rules updated.");
      break;

    default:
      break;
  }
}

module.exports = {
  groupHandler,
  welcomeHandler,
  handleGroupCommands,
};