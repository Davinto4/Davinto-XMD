// menu.js

module.exports = {
  menu: (prefix, botName, owner) => {
    return `
╭━━━〔 *${botName}* 〕━━━╮
┃ Owner: ${owner}
┃ Prefix: ${prefix}
┃ Made with ❤️ by Davinto
╰━━━━━━━━━━━━━━━━━━╯

🗂️ *MAIN MENU*
${prefix}menu - Show this menu
${prefix}help - Show help
${prefix}ping - Bot response time
${prefix}status - Show bot status
${prefix}owner - Show owner info

👥 *GROUP MENU*
${prefix}kick @user - Remove member
${prefix}add 234xxxx - Add member
${prefix}promote @user - Make admin
${prefix}demote @user - Remove admin
${prefix}tagall - Mention all members
${prefix}group close - Close group
${prefix}group open - Open group

🎨 *MEDIA TOOLS*
${prefix}sticker - Convert image/video to sticker
${prefix}toimg - Sticker to image
${prefix}tovideo - Sticker to video
${prefix}ttp text - Text to plain sticker
${prefix}attp text - Animated text sticker
${prefix}qr text - Generate QR code
${prefix}readqr - Scan QR from image

📥 *DOWNLOADER MENU*
${prefix}ytmp3 link - YouTube MP3
${prefix}ytmp4 link - YouTube MP4
${prefix}play songname - Search & download song
${prefix}video name - Search & download video
${prefix}igdl link - Instagram downloader
${prefix}tiktok link - TikTok downloader
${prefix}fb link - Facebook downloader
${prefix}mediafire link - Mediafire downloader

🧠 *AI & FUN MENU*
${prefix}ai prompt - Chat with AI
${prefix}gpt prompt - OpenAI GPT response
${prefix}truth - Truth game
${prefix}dare - Dare game
${prefix}joke - Random joke
${prefix}meme - Random meme

⚙️ *UTILITY MENU*
${prefix}calc 2+2 - Calculator
${prefix}define word - Dictionary
${prefix}weather city - Weather info
${prefix}news - Latest news
${prefix}shorten url - Shorten link
${prefix}translate text - Translate text
${prefix}wiki query - Wikipedia search

📊 *OWNER MENU*
${prefix}setprefix symbol - Change prefix
${prefix}setname text - Change bot name
${prefix}setbio text - Change bot bio
${prefix}block @user - Block user
${prefix}unblock @user - Unblock user
${prefix}broadcast text - Broadcast to all chats
${prefix}restart - Restart bot
${prefix}shutdown - Shutdown bot

╭━━━〔 *END* 〕━━━╮
┃ Powered by Davinto XMD
╰━━━━━━━━━━━━━━━━━━╯
    `;
  }
};