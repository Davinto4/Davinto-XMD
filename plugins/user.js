const moment = require("moment");

module.exports = {
  name: "User Features",
  commands: [
    {
      pattern: "afk",
      desc: "Set AFK with reason",
      execute: async (sock, msg, args, db) => {
        if (!db.afk) db.afk = {};
        db.afk[msg.sender] = { reason: args.join(" ") || "AFK", since: Date.now() };
        await sock.sendMessage(msg.chat, { text: `🚶 You are now AFK: ${db.afk[msg.sender].reason}` });
      }
    },
    {
      pattern: "profile",
      desc: "Show your profile info",
      execute: async (sock, msg, args, db) => {
        let user = msg.sender;
        let name = msg.pushName;
        let rank = db.rank?.[user] || 1;
        let level = db.level?.[user] || 1;
        let text = `👤 Profile\n\nName: ${name}\nRank: ${rank}\nLevel: ${level}`;
        await sock.sendMessage(msg.chat, { text });
      }
    },
    {
      pattern: "note",
      desc: "Save a personal note",
      execute: async (sock, msg, args, db) => {
        if (!db.notes) db.notes = {};
        db.notes[msg.sender] = args.join(" ");
        await sock.sendMessage(msg.chat, { text: "📝 Note saved!" });
      }
    },
    {
      pattern: "todo",
      desc: "Add a task to your todo list",
      execute: async (sock, msg, args, db) => {
        if (!db.todo) db.todo = {};
        if (!db.todo[msg.sender]) db.todo[msg.sender] = [];
        db.todo[msg.sender].push(args.join(" "));
        await sock.sendMessage(msg.chat, { text: `✅ Task added to your todo list!` });
      }
    },
    {
      pattern: "rank",
      desc: "Check your rank",
      execute: async (sock, msg, args, db) => {
        let rank = db.rank?.[msg.sender] || 1;
        await sock.sendMessage(msg.chat, { text: `🏆 Your rank is: ${rank}` });
      }
    },
    {
      pattern: "level",
      desc: "Check your level",
      execute: async (sock, msg, args, db) => {
        let level = db.level?.[msg.sender] || 1;
        await sock.sendMessage(msg.chat, { text: `📈 Your level is: ${level}` });
      }
    },
    {
      pattern: "pack",
      desc: "Save a sticker pack name",
      execute: async (sock, msg, args, db) => {
        if (!db.packs) db.packs = {};
        db.packs[msg.sender] = args.join(" ");
        await sock.sendMessage(msg.chat, { text: "🎨 Sticker pack saved!" });
      }
    },
    {
      pattern: "remind",
      desc: "Set a reminder",
      execute: async (sock, msg, args) => {
        let time = parseInt(args[0]);
        let text = args.slice(1).join(" ");
        if (!time || !text) return sock.sendMessage(msg.chat, { text: "Usage: .remind <seconds> <message>" });
        await sock.sendMessage(msg.chat, { text: `⏰ Reminder set for ${time} seconds.` });
        setTimeout(() => {
          sock.sendMessage(msg.chat, { text: `🔔 Reminder: ${text}`, mentions: [msg.sender] });
        }, time * 1000);
      }
    },
    {
      pattern: "stats",
      desc: "Show your activity stats",
      execute: async (sock, msg, args, db) => {
        let sent = db.stats?.[msg.sender]?.sent || 0;
        let received = db.stats?.[msg.sender]?.received || 0;
        await sock.sendMessage(msg.chat, { text: `📊 Stats\nMessages Sent: ${sent}\nMessages Received: ${received}` });
      }
    },
    {
      pattern: "horoscope",
      desc: "Get horoscope",
      execute: async (sock, msg, args) => {
        let zodiac = args[0];
        if (!zodiac) return sock.sendMessage(msg.chat, { text: "Usage: .horoscope <zodiac>" });
        let fake = [
          "Today is your lucky day 🍀",
          "Be careful with your decisions 🤔",
          "A surprise is waiting for you 🎁",
          "Stay positive and strong 💪",
          "You will find happiness in small things 🌸"
        ];
        let res = fake[Math.floor(Math.random() * fake.length)];
        await sock.sendMessage(msg.chat, { text: `♈ Horoscope for ${zodiac}: ${res}` });
      }
    },
    {
      pattern: "anonchat",
      desc: "Start anonymous chat (simulation)",
      execute: async (sock, msg, args, db) => {
        if (!db.anon) db.anon = {};
        if (db.anon[msg.sender]) {
          delete db.anon[msg.sender];
          await sock.sendMessage(msg.chat, { text: "❌ You left anonymous chat." });
        } else {
          db.anon[msg.sender] = true;
          await sock.sendMessage(msg.chat, { text: "✅ You joined anonymous chat. Waiting for partner..." });
        }
      }
    },
    {
      pattern: "joke",
      desc: "Get a random joke",
      execute: async (sock, msg) => {
        let jokes = [
          "Why don’t programmers like nature? It has too many bugs 🐛",
          "I told my computer I needed a break, and it said no problem — it needed one too 😂",
          "Why do Java developers wear glasses? Because they don’t C# 🤓"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        await sock.sendMessage(msg.chat, { text: joke });
      }
    },
    {
      pattern: "quote",
      desc: "Get a random inspirational quote",
      execute: async (sock, msg) => {
        let quotes = [
          "Believe in yourself and all that you are ✨",
          "Do what you can, with what you have, where you are 🌍",
          "Success is not final, failure is not fatal: it is the courage to continue that counts 💯"
        ];
        let q = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(msg.chat, { text: `💡 Quote: ${q}` });
      }
    }
  ]
};