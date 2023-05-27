const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: "mute-log",
    execute(message, args, Embed) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const bilgi = new Discord.RichEmbed()
                .setDescription('Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
                .setColor("0000A0")
            return message.channel.sendEmbed(bilgi).then(m => m.delete(150000));
            return
        }
        let mlog = message.mentions.channels.first()
        let sıfırla = db.fetch(`mlog_${message.guild.id}`)
        if (args[0] === "sıfırla") {
            if (!sıfırla) {
                mmessage.channel.send(Embed("» Hata! ⛔", `» Mute Log Kanalı zaten ayarlı değil`, "YELLOW"))
                return
            }
            db.delete(`mlog_${message.guild.id}`)
            message.channel.send(Embed("» Başarılı! ✅", `» Mute Log Kanalı başarıyla sıfırlandı.`, "GREEN"))
            message.react("✅")
            return
        }
        if (!mlog) {
            message.channel.send(Embed("» Hata! ⛔", `» Mute Log için bir metin kanalı etiketlemelisin`, "GREEN"))
        }
        db.set(`mlog_${message.guild.id}`, mlog.id)
        message.channel.send(Embed("» Başarılı! ✅", `» Mute Log Kanalı başarıyla ${mlog} olarak ayarlandı`, "GREEN"))
        message.react("✅")
    }
}