// commands.js

const fs = require("fs");
const axios = require("axios");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const { exec } = require("child_process");

module.exports = {
  // ✅ Sticker from image/video
  sticker: async (client, msg) => {
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
    } else {
      msg.reply("📌 Send an image/video with caption *.sticker*");
    }
  },

  // ✅ Convert sticker to image
  toimg: async (client, msg) => {
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      await client.sendMessage(msg.from, media, { sendMediaAsDocument: true });
    } else {
      msg.reply("📌 Reply to a sticker with *.toimg*");
    }
  },

  // ✅ YouTube MP3 downloader
  ytmp3: async (client, msg, args) => {
    if (!args[0]) return msg.reply("📌 Usage: .ytmp3 <link>");
    const url = args[0];
    if (!ytdl.validateURL(url)) return msg.reply("❌ Invalid YouTube link!");

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
    const filePath = path.resolve(__dirname, `./media/${title}.mp3`);

    msg.reply("⏳ Downloading audio, please wait...");
    ytdl(url, { filter: "audioonly" })
      .pipe(fs.createWriteStream(filePath))
      .on("finish", () => {
        client.sendMessage(msg.from, {
          audio: fs.readFileSync(filePath),
          mimetype: "audio/mp4",
        });
        fs.unlinkSync(filePath);
      });
  },

  // ✅ Weather info
  weather: async (client, msg, args) => {
    if (!args[0]) return msg.reply("📌 Usage: .weather <city>");
    const city = args.join(" ");
    try {
      const res = await axios.get(`https://wttr.in/${city}?format=3`);
      msg.reply(`🌦 Weather in ${city}: ${res.data}`);
    } catch (err) {
      msg.reply("❌ Failed to fetch weather data.");
    }
  },

  // ✅ AI Chat (Google Gemini)
  ai: async (client, msg, args) => {
    if (!args[0]) return msg.reply("📌 Usage: .ai <question>");
    const prompt = args.join(" ");
    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
          process.env.GEMINI_API_KEY,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }
      );

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "❌ No response from AI.";
      msg.reply(`🤖 Davinto AI:\n\n${reply}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      msg.reply("❌ Gemini AI error.");
    }
  },

  // ✅ Example utility
  ping: async (client, msg) => {
    msg.reply("🏓 Pong!");
  },

  // 🚧 Placeholders for other commands
  tts: async (client, msg, args) => msg.reply("🗣 TTS feature coming soon..."),
  stt: async (client, msg) => msg.reply("🎤 STT feature coming soon..."),
  insta: async (client, msg, args) => msg.reply("📸 Instagram downloader coming soon..."),
  tiktok: async (client, msg, args) => msg.reply("🎶 TikTok downloader coming soon..."),
  fb: async (client, msg, args) => msg.reply("📘 Facebook downloader coming soon..."),
  meme: async (client, msg) => msg.reply("😂 Meme generator coming soon..."),
  joke: async (client, msg) => msg.reply("🤣 Joke feature coming soon..."),
  quote: async (client, msg) => msg.reply("💬 Quote feature coming soon..."),
};