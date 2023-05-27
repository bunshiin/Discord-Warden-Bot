const Discord = require('discord.js');
const database = require('quick.db');
module.exports = {
  name: "kelime",
  execute(message, args, Embed, client) {
    
     var kelimeler = ['Kırık Taş', 'Kızıltaş',"Elmas Kılıç","Altın Kılıç","Netherite Kılıç","Demir Kılıç","Taş Kılıç","Creeper","Örümcek","Wither İskeleti","Zombi","Cadı","Balçık","Taş","Kömür","Demir","Altın","Bakır","Zümrüt","Elmas","Netherite","Lapis","Gözlemci","Karşılaştırıcı","Ali Bey","Kuvars","Piglin","Hoglin","Lav Kovası","Su Kovası","Düzgün Taş","Köylü","Demir Golem","Ender Ejderhası","Enderman","Steve","Alex","Herobrine","Notch","Java","Bedrock","Minecraft","Hayalet","Lav Gezer","Manyetit","Pusula","Shulker Kutusu","Çalışmas Masası","Fırın","Duman Fırını","Maden Fırını","Taş Kesici","Basamak","Tuzak Kapısı","Sandık","Varil"];
    if(!args[0]) return message.channel.send(Embed("» Uyarı! 🔔","» Yazan Kazanır Oynamak için\n Birini @Etiketlemen Gerek","YELLOW")); 
    if(!message.mentions.members.first()) return message.channel.send(Embed("» Hata! ⛔","» Kullanıcı Bulunamadı","RED"));
    const member = message.mentions.members.first();
    if(member.user.id === message.author.id) return message.channel.send(Embed("» Hata! ⛔","» Kendinle oynayamassın","RED"));
    
    message.channel.send(Embed("🔰 Bir Düello Teklifi Geldi 🔰",`\n Kabul Etmek İçin 🟢\n Reddetmek İçin 🔴\n Tepkilerine Basınız`)).then(async sent => {
      await sent.react('🟢');
      await sent.react('🔴');
    
      const filter = (reaction, user) => user.id === member.id;
      sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
        collected = collected.first();
        if(collected._emoji.name === '🔴') return sent.delete() && message.reply('Yazan kazanır kabul edilmedi.');
        sent.delete();
        message.channel.send(Embed("🗺️ Düşünüyorum","**Kelimeler Hazırlanıyor Evlat..**","YELLOW")).then(sent2 => {
          setTimeout(() => {
            const kelime = random(kelimeler);
            const mf = response => {
              return response.content.toLowerCase() === kelime.toLowerCase();
            };
              
            //message.channel.send(`${member} ${message.author}, Kelimeniz: **${kelime}**`);
            message.channel.send(Embed("✅ Duello Kabul Edildi",`${member} ${message.author}\n **Kelime:** \n${kelime}\n`)).then(m => m.delete({ timeout: 20000 }));
            message.channel.awaitMessages(mf, { max: 1, time: 30000, errors: ['time'] }).then(answer => {
              sent2.delete();
            
              //return message.channel.send(`${answer.first().author} doğru cevabı verdi!`).then(m => m.delete({ timeout: 20000 }))
              return message.channel.send(Embed("🔰 Düello Sona Erdi 🔰",`${answer.first().author} Kazandı 🍀`))
            }).catch(() => message.channel.send('Sanırım kimse kazanamadı.'));
    
          }, 3000);
        });
      }).catch(error => console.log(error) && message.reply('Bir cevap verilmedi.'));
    });
    
    function random(map) {
      if(!map) return;
      return map[Math.floor(Math.random() * map.length)];
    };
    
      
  }
}
