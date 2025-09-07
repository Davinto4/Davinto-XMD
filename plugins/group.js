const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { getBuffer } = require('../utils');

module.exports = {
  name: "Group Features",
  commands: [
    {
      pattern: "welcome",
      desc: "Enable or disable welcome messages",
      fromGroup: true,
      execute: async (sock, msg, args, db) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        if (!db.welcome) db.welcome = {};
        db.welcome[msg.chat] = args[0] === "on";
        await sock.sendMessage(msg.chat, { text: `Welcome messages ${db.welcome[msg.chat] ? "enabled ✅" : "disabled ❌"}` });
      }
    },
    {
      pattern: "goodbye",
      desc: "Enable or disable goodbye messages",
      fromGroup: true,
      execute: async (sock, msg, args, db) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        if (!db.goodbye) db.goodbye = {};
        db.goodbye[msg.chat] = args[0] === "on";
        await sock.sendMessage(msg.chat, { text: `Goodbye messages ${db.goodbye[msg.chat] ? "enabled ✅" : "disabled ❌"}` });
      }
    },
    {
      pattern: "antilink",
      desc: "Enable or disable anti-link protection",
      fromGroup: true,
      execute: async (sock, msg, args, db) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        if (!db.antilink) db.antilink = {};
        db.antilink[msg.chat] = args[0] === "on";
        await sock.sendMessage(msg.chat, { text: `Anti-link ${db.antilink[msg.chat] ? "enabled 🚫" : "disabled ✅"}` });
      }
    },
    {
      pattern: "kick",
      desc: "Kick a member",
      fromGroup: true,
      execute: async (sock, msg) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        let user = msg.mentionedJid[0];
        if (!user) return sock.sendMessage(msg.chat, { text: "Tag a user to kick" });
        await sock.groupParticipantsUpdate(msg.chat, [user], "remove");
      }
    },
    {
      pattern: "promote",
      desc: "Promote a member to admin",
      fromGroup: true,
      execute: async (sock, msg) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        let user = msg.mentionedJid[0];
        if (!user) return sock.sendMessage(msg.chat, { text: "Tag a user to promote" });
        await sock.groupParticipantsUpdate(msg.chat, [user], "promote");
      }
    },
    {
      pattern: "demote",
      desc: "Demote an admin to member",
      fromGroup: true,
      execute: async (sock, msg) => {
        if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can use this command!" });
        let user = msg.mentionedJid[0];
        if (!user) return sock.sendMessage(msg.chat, { text: "Tag a user to demote" });
        await sock.groupParticipantsUpdate(msg.chat, [user], "demote");
      }
    },
    {
      pattern: "tagall",
      desc: "Mention all group members",
      fromGroup: true,
      execute: async (sock, msg, args) => {
        let metadata = await sock.groupMetadata(msg.chat);
        let participants = metadata.participants.map(p => p.id);
        let text = args.join(" ") || "Tagging all members:";
        await sock.sendMessage(msg.chat, { text, mentions: participants });
      }
    },
    {
      pattern: "rules",
      desc: "Set or show group rules",
      fromGroup: true,
      execute: async (sock, msg, args, db) => {
        if (!db.rules) db.rules = {};
        if (args.length > 0) {
          if (!msg.isAdmin) return sock.sendMessage(msg.chat, { text: "Only admins can set rules!" });
          db.rules[msg.chat] = args.join(" ");
          await sock.sendMessage(msg.chat, { text: "✅ Rules updated!" });
        } else {
          let rules = db.rules[msg.chat] || "No rules set.";
          await sock.sendMessage(msg.chat, { text: `📜 Group Rules:\n${rules}` });
        }
      }
    }
  ]
};