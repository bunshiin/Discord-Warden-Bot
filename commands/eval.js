const Discord = require("discord.js");

module.exports = {
    name: "eval",
    async execute(message, args, Embed, client) {
        if (message.author.id !== "453576139240112138") return false;
        let sunor = args.slice(0).join(" ")
        if (!sunor.toLowerCase().includes("token")) {
            try {
                let kodcusunor = eval(sunor)
                if (sunor.length < 1) return message.channel.send({ content: `kod vre` })

                if (typeof code !== "string") kodcusunor = require("util").inspect(kodcusunor, { depth: 0 });
                return message.channel.send(kodcusunor.replace("Promise { <pending> }", "çalıştırdım herhalde, bilmiom."))
            } catch (e) {
                const embed2 = new Discord.MessageEmbed()
                    .setColor('#e74c3c')
                    .addField('Kod', `\`\`\`js\n${sunor}\`\`\``)
                    .addField('Hata', `\`\`\`js\n${e}\`\`\``)
                return message.channel.send(embed2);
            }
        } else {
            return message.channel.send(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/663807316591771652/688697441171538061/nah.png"))
        }
    }
}