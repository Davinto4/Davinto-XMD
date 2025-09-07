module.exports = async (sock) => {
  // When participant joins or leaves
  sock.ev.on("group-participants.update", async (update) => {
    try {
      const metadata = await sock.groupMetadata(update.id);
      const participants = update.participants;

      for (let participant of participants) {
        let ppUrl;
        try {
          ppUrl = await sock.profilePictureUrl(participant, "image");
        } catch {
          ppUrl = "https://i.ibb.co/5RjchBg/default.jpg"; // fallback
        }

        if (update.action === "add") {
          await sock.sendMessage(update.id, {
            image: { url: ppUrl },
            caption: `👋 Welcome @${participant.split("@")[0]} to *${metadata.subject}*!\n\nType .menu to see my features.`,
            mentions: [participant]
          });
        } else if (update.action === "remove") {
          await sock.sendMessage(update.id, {
            text: `👋 Goodbye @${participant.split("@")[0]} from *${metadata.subject}*`,
            mentions: [participant]
          });
        }
      }
    } catch (err) {
      console.error("Group participant update error:", err);
    }
  });

  // Detect group updates (subject, desc, settings)
  sock.ev.on("groups.update", async (update) => {
    try {
      const changes = update[0];
      if (changes.subject) {
        await sock.sendMessage(changes.id, {
          text: `📢 Group subject has been updated to *${changes.subject}*`
        });
      }
      if (changes.desc) {
        await sock.sendMessage(changes.id, {
          text: `📖 Group description updated:\n${changes.desc}`
        });
      }
    } catch (err) {
      console.error("Group update error:", err);
    }
  });

  // Antilink feature
  sock.ev.on("messages.upsert", async (m) => {
    try {
      const msg = m.messages[0];
      if (!msg.message || msg.key.fromMe) return;

      const chatId = msg.key.remoteJid;
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";

      // Check for links
      if (text.match(/(https?:\/\/[^\s]+)/gi)) {
        let metadata = await sock.groupMetadata(chatId);
        if (!metadata) return;

        // Example: just delete message (can be expanded with DB check)
        await sock.sendMessage(chatId, {
          text: `🚫 Links are not allowed here, @${msg.key.participant.split("@")[0]}`,
          mentions: [msg.key.participant]
        });

        await sock.sendMessage(chatId, { delete: msg.key });
      }
    } catch (err) {
      console.error("Antilink error:", err);
    }
  });
};