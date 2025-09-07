const axios = require("axios");
const QRCode = require("qrcode");

module.exports = {
  name: "utilities",
  description: "Utility & productivity tools",
  command: ["calc", "dict", "unit", "qrcode", "barcode", "topdf", "encrypt", "decrypt", "shorten", "expand", "phone", "whois", "ip", "timer"],
  usage: "calc <expr> | dict <word> | unit <value|unit> | qrcode <text> | shorten <url> | expand <url> | phone <num> | whois <domain> | ip <addr> | timer <sec>",

  async execute(sock, msg, args, cmd) {
    const jid = msg.key.remoteJid;

    try {
      if (cmd === "calc") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .calc <expression>" }, { quoted: msg });
        let expr = args.join(" ");
        let res = eval(expr); // ⚠️ basic evaluation (not safe for untrusted input)
        await sock.sendMessage(jid, { text: `🧮 ${expr} = ${res}` }, { quoted: msg });
      }

      else if (cmd === "dict") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .dict <word>" }, { quoted: msg });
        let word = args[0];
        let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let meaning = res.data[0].meanings[0].definitions[0].definition;
        await sock.sendMessage(jid, { text: `📖 ${word}: ${meaning}` }, { quoted: msg });
      }

      else if (cmd === "qrcode") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .qrcode <text>" }, { quoted: msg });
        let text = args.join(" ");
        let qr = await QRCode.toDataURL(text);
        let base64 = qr.split(",")[1];
        let buffer = Buffer.from(base64, "base64");
        await sock.sendMessage(jid, { image: buffer, caption: "✅ QR Code Generated!" }, { quoted: msg });
      }

      else if (cmd === "shorten") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .shorten <url>" }, { quoted: msg });
        let url = args[0];
        let res = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
        await sock.sendMessage(jid, { text: `🔗 Shortened URL: ${res.data}` }, { quoted: msg });
      }

      else if (cmd === "expand") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .expand <url>" }, { quoted: msg });
        let url = args[0];
        let res = await axios.get(`https://unshorten.me/json/${url}`);
        await sock.sendMessage(jid, { text: `🔗 Expanded URL: ${res.data.resolved_url}` }, { quoted: msg });
      }

      else if (cmd === "phone") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .phone <number>" }, { quoted: msg });
        let num = args[0];
        let res = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${num}`, {
          headers: { apikey: "YOUR_API_LAYER_KEY" } // 🔑 Replace with real API key
        });
        let info = res.data;
        await sock.sendMessage(jid, { text: `📱 Number: ${info.international_format}\nCountry: ${info.country_name}\nCarrier: ${info.carrier}` }, { quoted: msg });
      }

      else if (cmd === "whois") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .whois <domain>" }, { quoted: msg });
        let domain = args[0];
        let res = await axios.get(`https://api.api-ninjas.com/v1/whois?domain=${domain}`, {
          headers: { "X-Api-Key": "YOUR_API_NINJAS_KEY" } // 🔑 Replace with real API key
        });
        await sock.sendMessage(jid, { text: `🌐 WHOIS for ${domain}:\n\n${res.data.whois}` }, { quoted: msg });
      }

      else if (cmd === "ip") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .ip <address>" }, { quoted: msg });
        let ip = args[0];
        let res = await axios.get(`https://ipinfo.io/${ip}/json`);
        await sock.sendMessage(jid, { text: `💻 IP Info for ${ip}:\nCountry: ${res.data.country}\nRegion: ${res.data.region}\nCity: ${res.data.city}` }, { quoted: msg });
      }

      else if (cmd === "timer") {
        if (!args[0]) return sock.sendMessage(jid, { text: "Usage: .timer <seconds>" }, { quoted: msg });
        let sec = parseInt(args[0]);
        if (isNaN(sec)) return sock.sendMessage(jid, { text: "❌ Invalid number." }, { quoted: msg });
        await sock.sendMessage(jid, { text: `⏳ Timer started for ${sec} seconds...` }, { quoted: msg });

        setTimeout(() => {
          sock.sendMessage(jid, { text: `⏰ Timer finished!` });
        }, sec * 1000);
      }

    } catch (err) {
      console.error("Utility plugin error:", err);
      await sock.sendMessage(jid, { text: "⚠️ Something went wrong with utility command." }, { quoted: msg });
    }
  }
};