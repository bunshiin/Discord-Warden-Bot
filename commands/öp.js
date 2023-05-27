const Discord = require("discord.js");
module.exports = {
    name: "öp",
    async execute(message, args, Embed, client) {
        let mesaj = args.slice(0).join(" ");
        if (mesaj.length < 1) return message.channel.send("Kimi öpmek istiyorsun?");
        
        const EmbedCode = new Discord.MessageEmbed()
      
          .setAuthor(" ")
          .setColor(`RED`)
          .setDescription(
            message.author.username +
              ` **adlı kullanıcı, ${mesaj} adlı kullanıcıyı öptü.**`
          )
      
          .setImage(`https://media.giphy.com/media/lTQF0ODLLjhza/giphy.gif`);
            
          
        return message.channel.send(EmbedCode);
      } 
    }

 