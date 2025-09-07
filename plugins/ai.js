const fetch = require("node-fetch");

module.exports = {
  name: "AI Features",
  commands: [
    {
      pattern: "ai",
      desc: "Ask Gemini AI a question",
      execute: async (sock, msg, args) => {
        let question = args.join(" ");
        if (!question) return sock.sendMessage(msg.chat, { text: "Usage: .ai <question>" });

        try {
          let res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCAs2wxLD5ZQRDxO9M3_o4IHk3M4h-wLJE",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [{ text: question }]
                  }
                ]
              })
            }
          );

          let data = await res.json();
          let reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "⚠️ No response from Gemini AI";

          await sock.sendMessage(msg.chat, { text: `🤖 Gemini: ${reply}` });
        } catch (err) {
          console.error("AI Error:", err);
          await sock.sendMessage(msg.chat, { text: "❌ Error while connecting to Gemini AI" });
        }
      }
    },
    {
      pattern: "img",
      desc: "Generate image with AI (placeholder)",
      execute: async (sock, msg, args) => {
        let prompt = args.join(" ");
        if (!prompt) return sock.sendMessage(msg.chat, { text: "Usage: .img <prompt>" });
        await sock.sendMessage(msg.chat, { text: `🖼️ (Demo) AI Image for: ${prompt}` });
      }
    },
    {
      pattern: "tts",
      desc: "Convert text to speech (fake)",
      execute: async (sock, msg, args) => {
        let text = args.join(" ");
        if (!text) return sock.sendMessage(msg.chat, { text: "Usage: .tts <lang|text>" });
        await sock.sendMessage(msg.chat, { text: `🔊 TTS (demo): ${text}` });
      }
    },
    {
      pattern: "stt",
      desc: "Convert speech to text (fake)",
      execute: async (sock, msg) => {
        await sock.sendMessage(msg.chat, { text: "🎙️ STT (demo only)" });
      }
    },
    {
      pattern: "translate",
      desc: "Translate text (fake)",
      execute: async (sock, msg, args) => {
        let lang = args[0];
        let text = args.slice(1).join(" ");
        if (!lang || !text) return sock.sendMessage(msg.chat, { text: "Usage: .translate <lang> <text>" });
        await sock.sendMessage(msg.chat, { text: `🌐 Translation (demo): ${text} → [${lang}]` });
      }
    }
  ]
};