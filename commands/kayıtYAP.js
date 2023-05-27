
const Discord = require('discord.js')
module.exports = {
    name: 'kayıt',
    description: '',
    async execute(message, args, Embed) {
        let unregisrole = message.guild.roles.cache.find(x => x.name === 'Kayıt Bekleyen Aga');
        let regisrole = message.guild.roles.cache.find(x => x.name === '•Üye');
        let member = message.member

        let content = message.content.replace("!kayıt", "").split(' ').filter(a => a !== "" && a !== " ")//.splice(1);
        let isim = content.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1).toLowerCase()).join(" ")
        let yas = content.filter(arg => !isNaN(arg))[0] || undefined;
        if(!member.roles.cache.has(unregisrole.id)) return;
        if (!isim || !yas) return message.channel.send(Embed(" » Hata! ⛔ ", "» Kayıt Olmak İçin **!kayıt isim yas**", "RED", "")).then(message => message.delete({ timeout: 5000 }));
        if (yas <= 10) return message.channel.send(Embed("» Uyarı! 🔔", "» Sencede ortam için biraz küçük değilmisin ?", "YELLOW", ""));

        await member.setNickname(`${isim} | ${yas}`);

        await member.roles.remove(unregisrole.id);
        await member.roles.add(regisrole.id);
        await message.channel.send(Embed("» ✅ Başarılı!\n» ✅ Kayıt İşlemi Tamamlandı", `» 🔔 Hoşgeldin ${member}`, "GREEN", ""));

        const kayıtEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle("» ✅ Başarılı!\n» ✅ Yeni Kayıt Oluşturuldu ", ` `)
            .setDescription(` » 🔔 Hoşgeldin ${member} \n » 🔔 Kullanıcı: ${isim} | ${yas}`)
            .setTimestamp()
            .setColor("004000");

            const hgEEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member} Aramıza katıldı ona bir hoşgeldin diyelim. :wave:`)
            .setTimestamp()
            .setColor("RANDOM")

        await message.guild.channels.cache.get("924315930119532554").send(kayıtEmbed);
        await message.guild.channels.cache.get("988465043236589588").send(hgEEmbed).then(message => message.delete({ timeout: 20000 }));
       
    }
}
