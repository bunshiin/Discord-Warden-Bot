const discord = require('discord.js');
module.exports = {
  name: 'ban',
  description: 'Kullanıcıları serverden banlar',
  execute(message, args, Embed, client) {
    var guild = message.guild;
    var banlayan = message.author.tag;
    let banxx = message.guild.fetchBans();
    var kisi = message.mentions.members.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
    var sebeb = args.slice(1).join(" ");

    if (['921125707558551622', '927147674971541546'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));

    if (!kisi) {
      const embedbruh = new discord.MessageEmbed()
        .setDescription("**❌ Belirttiğiniz Kişi Sunucuda Yok Veya Banlamak İçin Herhangi Bir Kişi Belirtmedin!**")
        .setColor("RED")
      return message.channel.send(embedbruh)

    }

    if (!message.author.id !== message.guild.ownerID) {
      if (!message.member.hasPermission("ADMINISTRATOR") ? message.guild.members.cache.has(kisi.id) ? message.member.roles.highest.position <= message.guild.members.cache.get(kisi.id).roles.highest.position : false : false) {
        const rolsira = new discord.MessageEmbed()
          .setDescription("**❌ Bu Kişi Rol Sıralamasında Senden Yüksekte Veya Eşit Bu Sebeple Onu Banlayamazsın!**")
          .setColor("RED")
        return message.channel.send(rolsira)
      }
    }

    if (kisi.id == message.guild.ownerID) {
      const arkadaşownermış = new discord.MessageEmbed()
        .setDescription("**❌ Bu Kişi Sunucu Sahibi Onu Banlayamazsın!**")
        .setColor("RED")
      return message.channel.send(arkadaşownermış)
    }

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      const yetkimyok = new discord.MessageEmbed()
        .setDescription("**❌ Herhangi Bir Kişi Banlamak İçin `Üyeleri Engelle` İznine Sahip Olmalıyım!**")
        .setColor("RED")
      return message.channel.send(yetkimyok)
    }


    if (!kisi.bannable) {
      const notbannable = new discord.MessageEmbed()
        .setDescription("**❌ Bu Kişiyi Banlayamam!**")
        .setColor("RED")
      return message.channel.send(notbannable)
    }



    var now = new Date()
    var sebepp = null

    if (!sebeb) {
      sebepp = "Sebep Belirtilmemiş."
    }
    if (sebeb) {
      sebepp = sebeb
    }
    try {
      const sucembeddm = new discord.MessageEmbed()
        .setDescription(`${kisi} **${guild}** Adlı Sunucudan Banlandın.` + "\r\n" + `**Sebep: ${sebepp}**`)
        .setColor("RED")
      kisi.send(sucembeddm).catch(err => console.error)


      const sucembed = new discord.MessageEmbed()
        .setDescription(`✅ ${kisi} **Adlı Kullanıcı ${sebepp} Sebebi İle Banlandı.**`)
        .setColor("GREEN")
      message.channel.send(sucembed)

      const kickEmbed = new discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle("» Başarılı! ✅ \n » Bir Kullanıcı Serverden Yasaklandı ")
        .setDescription(` » 🔔 Yasaklana Kullanıcı: ${kisi} \n » 🔔 Kullanıcıyı Yasaklayan Yetkili:  ${message.author}\n » 🔔 Sebep: ${sebepp}\n » 🔔 Kullanıcı ID: ${kisi.id} `)
        .setTimestamp()
        .setColor("004000")

      message.guild.channels.cache.get("924317252201873418").send(kickEmbed);


      return guild.members.ban(kisi, { reason: sebepp });

    } catch (error) {
      message.reply("**Bir Hata İle Karşılaşıldı Birkaç Dakika İçinde Tekrar Deneyin Eğer Bu Sorununuza Çözüm Olmadıysa Bir Geliştirici Veya Yetkiliye Bildirin!**")
      console.log(error)
    }









  }
}


