const Discord = require("discord.js");
const ms = require('ms');
const client = new Discord.Client();
const fetch = require("node-fetch");
const moment = require("moment");
moment.locale("tr");
const db = require("quick.db");

module.exports = {
    name: "unmute",
    async execute(message, args, Embed, client) {
        if (['930050192424697916'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            await message.channel.send("Bir üye belirtmelisin!");
            await message.react(red);
            return;
        }

        const guildmember = await message.guild.members.cache.get(member.id)

        await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${guildmember.user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ communication_disabled_until: null }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${client.token}`,
            },
        });

        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
            .setDescription(`
• Başarılı! ✅
• ${member.toString()} adlı kişinin susturması  kaldırıldı.
• Kaldıran Yetkili: ${message.author}`)
            .setFooter(`${moment(Date.now()).format("LLL")}`)

        let log = await db.fetch(`mlog_${message.guild.id}`)
        if (log) await message.guild.channels.cache.get(log).send(embed);

        await message.channel.send(Embed("",`${member.toString()} üyesinin zaman aşımı, ${message.author} tarafından kaldırıldı!`,"GREEN"));
    }
}