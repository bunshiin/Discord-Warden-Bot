const Discord = require('discord.js');
module.exports = {
    name: "yaz",
    execute(message, args, Embed, client) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        const text = args.splice(0, args.length).join(" ");
        
        if(!text) return message.channel.send(Embed("","Lütfen bir mesaj girin","GREEN",""));
        const infoEmbed = new Discord.MessageEmbed()
        .setColor("GRAY")
        .setDescription(text)
           message.channel.send(infoEmbed).then(msg =>{
            message.delete();
           })
           
    }}
    