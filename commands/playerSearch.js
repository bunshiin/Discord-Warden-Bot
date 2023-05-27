const Discord = require('discord.js')
module.exports = {
    name: "oyun",
    execute(message, args, Embed, client) {
            const user = message.author;
            
            const oyun = args[0];
            if(!oyun) return message.reply('Oyunucu aramak için bir oyun belirtmen gerek') 
            const nott = message.content.split(' ').slice(2);
            const not = nott.join(' ');
            if(!not) return message.reply('Bir not eklemelisin');
            if(message.member.voice.channel){
                message.delete();
                const embed = new Discord.MessageEmbed()
                .setTitle(`» 🎮 Oyun Arıyor: ${user.username}`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .addField("» 🎳 Oyun:", `**${oyun}**`)
                .addField(`» 🔊 Sesli Kanal:`,`${message.member.voice.channel}` )
                .addField('» 📑 Detaylar:', `**${not}**`)
                
                .setColor("RANDOM")
                message.channel.send(embed);
            }else{
                message.reply("Sesli bir kanala girmen gerek");
            }
    }
}