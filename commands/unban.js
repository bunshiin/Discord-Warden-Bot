const Discord = require('discord.js');
module.exports = {
    name: 'unban',
    description: '',
    execute(message, args, Embed) {
        const bannedPlayer = args[0];
        if (['921125707558551622', '927147674971541546'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));
        
        if (!args[0]) return message.channel.send(Embed("» ⛔ Hata!  ", "» Kullanıcının banını kaldırman için **ID** \n» Numarasına ihtiyacın var", "FF0000", "")).then(message => message.delete({ timeout: 10000 }));

        message.guild.members.unban(bannedPlayer)
        message.channel.send(Embed(`» ✅ Başarılı! \n » Kullanıcının Sunucu Yasağı Başarıyla Kaldırıldı`, ` \n » 🔔 Yasağı Kalkan Kişi ${bannedPlayer}`, "004000", "")).then(message => message.delete({ timeout: 10000 }));

        const banEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle("» Başarılı! ✅ \n » Bir Kullanıcının Server Yasağı Kaldırıldı ")
            .setDescription(` » 🔔 Yasağı Kalkan Kullanıcı: ${bannedPlayer}\n » 🔔 Yasağı Kaldıran Yetkili: ${message.author}`)
            .setTimestamp()
            .setColor("004000")

        message.guild.channels.cache.get("924317252201873418").send(banEmbed);
    }
}