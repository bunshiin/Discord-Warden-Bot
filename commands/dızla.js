const Discord = require("discord.js");

module.exports = {
    name: "dızla",
    async execute(message, args, Embed, client) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;

        const emoji = args[0];
        if (!emoji) return message.channel.send("memoji belirt");

        let customemoji = Discord.Util.parseEmoji(emoji) || args[0];

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;
            return await message.channel.send(new Discord.MessageAttachment(Link));
        }
    }
}