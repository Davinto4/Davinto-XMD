module.exports = {
  name: "Fun & Entertainment",
  commands: [
    {
      pattern: "truth",
      desc: "Ask a truth question",
      execute: async (sock, msg) => {
        let truths = [
          "What’s your biggest fear? 😱",
          "Have you ever lied to your best friend? 🤔",
          "What’s the most embarrassing thing you’ve done? 🙈",
          "Who was your first crush? 💘",
          "Have you ever cheated in a test? 📖"
        ];
        let q = truths[Math.floor(Math.random() * truths.length)];
        await sock.sendMessage(msg.chat, { text: `❓ Truth: ${q}` });
      }
    },
    {
      pattern: "dare",
      desc: "Get a dare challenge",
      execute: async (sock, msg) => {
        let dares = [
          "Send your last 5 emojis 😜",
          "Sing a song and send voice note 🎤",
          "Say ‘I love coding’ 10 times 🤖",
          "Change your name to ‘Noob’ for 1 hour 😂",
          "Send a funny selfie 🤳"
        ];
        let d = dares[Math.floor(Math.random() * dares.length)];
        await sock.sendMessage(msg.chat, { text: `🔥 Dare: ${d}` });
      }
    },
    {
      pattern: "wyr",
      desc: "Would you rather question",
      execute: async (sock, msg) => {
        let q = [
          "Would you rather be rich 💰 but sad 😢 or poor 💸 but happy 😀?",
          "Would you rather have unlimited food 🍔 or unlimited internet 📶?",
          "Would you rather time travel to the past ⏳ or the future 🚀?",
          "Would you rather always tell the truth 🤥 or always lie 😬?",
          "Would you rather be invisible 👻 or be able to fly 🕊️?"
        ];
        let res = q[Math.floor(Math.random() * q.length)];
        await sock.sendMessage(msg.chat, { text: `🤔 WYR: ${res}` });
      }
    },
    {
      pattern: "gif",
      desc: "Fake GIF search",
      execute: async (sock, msg, args) => {
        let query = args.join(" ") || "funny";
        await sock.sendMessage(msg.chat, { text: `🎞️ Here’s a random GIF for *${query}* (demo only)` });
      }
    },
    {
      pattern: "emojify",
      desc: "Convert text to emojis",
      execute: async (sock, msg, args) => {
        let text = args.join(" ");
        if (!text) return sock.sendMessage(msg.chat, { text: "Usage: .emojify <text>" });
        let emojified = text.replace(/[aeiou]/gi, "😀");
        await sock.sendMessage(msg.chat, { text: emojified });
      }
    },
    {
      pattern: "roast",
      desc: "Roast someone",
      execute: async (sock, msg, args) => {
        let roasts = [
          "You bring everyone so much joy… when you leave the room 😂",
          "You have something on your face… oh wait, that’s just your face 😬",
          "If I wanted to kill myself, I’d climb your ego and jump to your IQ 🤯",
          "You’re proof that even evolution takes breaks 🐒",
          "I’d agree with you but then we’d both be wrong 🤣"
        ];
        let roast = roasts[Math.floor(Math.random() * roasts.length)];
        await sock.sendMessage(msg.chat, { text: `🔥 Roast: ${roast}` });
      }
    },
    {
      pattern: "love",
      desc: "Check love percentage with someone",
      execute: async (sock, msg, args) => {
        let user = msg.mentionedJid[0];
        if (!user) return sock.sendMessage(msg.chat, { text: "Tag someone to check love ❤️" });
        let percent = Math.floor(Math.random() * 100);
        await sock.sendMessage(msg.chat, { text: `💞 Love between you and @${user.split("@")[0]}: *${percent}%*`, mentions: [user] });
      }
    },
    {
      pattern: "fact",
      desc: "Get a random fact",
      execute: async (sock, msg) => {
        let facts = [
          "Bananas are berries, but strawberries aren’t 🍌🍓",
          "Honey never spoils 🍯",
          "Sharks existed before trees 🦈🌳",
          "Your body has more bacteria than human cells 🦠",
          "Octopuses have three hearts ❤️❤️❤️"
        ];
        let fact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(msg.chat, { text: `📢 Fact: ${fact}` });
      }
    },
    {
      pattern: "fortune",
      desc: "Get your fortune cookie",
      execute: async (sock, msg) => {
        let fortunes = [
          "You will soon get a pleasant surprise 🎁",
          "Hard work pays off, success is near 💼",
          "Someone is secretly admiring you 👀",
          "Opportunities will knock on your door 🚪",
          "Stay positive, brighter days are coming 🌞"
        ];
        let f = fortunes[Math.floor(Math.random() * fortunes.length)];
        await sock.sendMessage(msg.chat, { text: `🥠 Fortune: ${f}` });
      }
    },
    {
      pattern: "quiz",
      desc: "Random quiz question",
      execute: async (sock, msg) => {
        let quiz = [
          { q: "What’s the capital of France? 🇫🇷", a: "Paris" },
          { q: "What’s 5 + 7 × 2? ➕", a: "19" },
          { q: "Who developed JavaScript? 💻", a: "Brendan Eich" },
          { q: "What’s the fastest land animal? 🐆", a: "Cheetah" },
          { q: "What planet is known as the Red Planet? 🔴", a: "Mars" }
        ];
        let q = quiz[Math.floor(Math.random() * quiz.length)];
        await sock.sendMessage(msg.chat, { text: `📝 Quiz: ${q.q}\n(Answer: ${q.a})` });
      }
    },
    {
      pattern: "rate",
      desc: "Rate a user",
      execute: async (sock, msg) => {
        let user = msg.mentionedJid[0];
        if (!user) return sock.sendMessage(msg.chat, { text: "Tag someone to rate ⭐" });
        let stars = Math.floor(Math.random() * 5) + 1;
        await sock.sendMessage(msg.chat, { text: `⭐ Rating for @${user.split("@")[0]}: ${"⭐".repeat(stars)}`, mentions: [user] });
      }
    },
    {
      pattern: "nick",
      desc: "Get a funny nickname",
      execute: async (sock, msg, args) => {
        let name = args.join(" ") || msg.pushName;
        let nicks = ["The Coder 🖥️", "Meme Lord 😂", "Pro Max 🔥", "Chill Master 🧊", "Legend 👑"];
        let nick = nicks[Math.floor(Math.random() * nicks.length)];
        await sock.sendMessage(msg.chat, { text: `🎭 Nickname for ${name}: ${nick}` });
      }
    }
  ]
};