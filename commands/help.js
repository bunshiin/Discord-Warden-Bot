const Discord = require('discord.js');

module.exports = {
  name: "help",
  execute(message, args, Embed) {
    let pages = [
      '**Bot Hakkında Kısa Bilgı**\n\n\n  **`?`avatar = etiketlediğiniz kişinin avatarını görürsün** \n  **`?`bilgi = etiketlediğiniz kişinin bilgilerini görürsün** \n  **`?`sil = 1-99 arası mesajları kanaldan temizler**',
      '**Moderasyon Komutları**\n\n\n  **`?`ban = etiketlenen kullanıcıyı serverden banlar** \n  **`?`kick = etiketlenen kullanıcı serverden atılır** \n **`?`mute = etiketlenen kullanıcı süre bilgileri girilerek ceza verilir** \n **`?`unban = ID`si alınan kullanıcının banı açılır**',
      '**Log sistemleri**\n\n\n  **`?`mute-log = cezalar için aç-kapat fonksiyonları olan kanal ayarlı log sistemi** \n  **`?`küfür = küfür tespit için aç-kapat fonksiyonları olan  log sistemi** \n  **`?`reklam = reklam tespit için aç-kapat fonksiyonları olan  log sistemi**',
      '**Oyun Komutları**\n\n\n **`?`öp = Belirtilen Kullanıcıyı Öper** \n **`?`dans-et = Belirtilen Kullanıcı İle Dans Eder \n `?`kelime = etiketlenen kişi ile ilk yazan kazanır oynarsın** \n **`?`oyun = oyuncu araması başlatır**',
      

    ];
    let page = 1;

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail('https://cdn.discordapom/attachments/487719679868272689/488329963926192158/image0.png')
      .setFooter(`Sayfa ${page} / ${pages.length}`)
      .setDescription(pages[page - 1])
    message.channel.send(embed).then(msg => {

      msg.react('⬅')
        .then(r => {
          msg.react('➡')

          //Filter
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

          const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
          const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

          forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;

            embed.setDescription(pages[page - 1]);
            embed.setColor('RANDOM')
            embed.setFooter(`Sayfa ${page} / ${pages.length}`)
            msg.edit(embed)
          })
          backwards.on('collect', r => {
            if (page === 1) return;
            page--;

            embed.setColor('RANDOM')
            embed.setDescription(pages[page - 1]);
            embed.setFooter(`Sayfa ${page} / ${pages.length}`)
            msg.edit(embed)
          })

        })
    })
  }
}

