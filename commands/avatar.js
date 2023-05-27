const Discord = require('discord.js')
module.exports = {
    name: 'avatar',
    description: '',
    async execute(message, args, Embed, client) {
        let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
        //if(!user) return message.channel.send(Embed("» Hata! ⛔","» Kimseyi etiketlemedin","FF0000","")).then(message => message.delete({timeout: 5000}));

        const embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.avatarURL({ dynamic: true }))
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor("#F58862")
        message.channel.send(embed)
    }
}