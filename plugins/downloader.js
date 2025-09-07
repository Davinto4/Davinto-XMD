const axios = require("axios");

module.exports = {
  name: "downloader",
  description: "Download videos or audio from YouTube, TikTok, Facebook",
  command: ["ytmp3", "ytmp4", "tiktok", "fb", "facebook"],
  usage: "ytmp3 <url> | ytmp4 <url> | tiktok <url> | fb <url>",
  async execute(sock, msg, args, cmd) {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid, { text: "❌ Please provide a valid link." }, { quoted: msg });
    }

    const url = args[0];

    try {
      if (cmd === "ytmp3") {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏳ Downloading audio..." }, { quoted: msg });
        let res = await axios.get(`https://api.vihangayt.me/download/ytmp3?url=${url}`);
        if (!res.data.status) throw new Error("Download failed!");
        await sock.sendMessage(msg.key.remoteJid, { audio: { url: res.data.result.download }, mimetype: "audio/mpeg" }, { quoted: msg });
      }

      else if (cmd === "ytmp4") {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏳ Downloading video..." }, { quoted: msg });
        let res = await axios.get(`https://api.vihangayt.me/download/ytmp4?url=${url}`);
        if (!res.data.status) throw new Error("Download failed!");
        await sock.sendMessage(msg.key.remoteJid, { video: { url: res.data.result.download }, caption: res.data.result.title }, { quoted: msg });
      }

      else if (cmd === "tiktok") {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏳ Downloading TikTok..." }, { quoted: msg });
        let res = await axios.get(`https://api.vihangayt.me/download/tiktok?url=${url}`);
        if (!res.data.status) throw new Error("Download failed!");
        await sock.sendMessage(msg.key.remoteJid, { video: { url: res.data.result.video }, caption: "✅ TikTok downloaded!" }, { quoted: msg });
      }

      else if (cmd === "fb" || cmd === "facebook") {
        await sock.sendMessage(msg.key.remoteJid, { text: "⏳ Downloading Facebook video..." }, { quoted: msg });
        let res = await axios.get(`https://api.vihangayt.me/download/fb?url=${url}`);
        if (!res.data.status) throw new Error("Download failed!");
        await sock.sendMessage(msg.key.remoteJid, { video: { url: res.data.result.hd }, caption: "✅ Facebook video downloaded!" }, { quoted: msg });
      }

    } catch (err) {
      console.error("Downloader error:", err);
      await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Failed to download. Try another link." }, { quoted: msg });
    }
  }
};