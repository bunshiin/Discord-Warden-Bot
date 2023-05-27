const Discord = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["gecikme", "ms"],
    description: "Botun Pingini Ölçer",
    usage: "ping",
    ownerOnly: false,

    execute(message, args, Embed, client) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        const ping2 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Pingimi ${client.ws.ping} MS Olarak Ölçtüm!`)

        const ping = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Pingim Ölçülüyor....`)
        message.channel.send(ping).then(m => {
            setTimeout(() => {
                m.edit(ping2)
            }, 3000);
        })

    }
}

