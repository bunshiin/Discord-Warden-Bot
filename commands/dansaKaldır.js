const Discord = require('discord.js');
module.exports = {
    name: "dans-et",
    execute(message, args, Embed, client) {
        var s = 0;
        var kisi = message.mentions.users.first();
        if (!kisi) return message.channel.send("Lütfen birini etiketleyin");
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${message.author} ${kisi} kişisine dans teklifi etti ${kisi} Kabul ediyor musun ?`)
            .setColor("RANDOM")).then(message => {  
                message.react("✅");
                message.react("❌");
                client.on("messageReactionAdd", (reaction, user) => {
                    if (s == 0) {
                        if (reaction.message.id == message.id) {
                            if (user.id == kisi.id) {
                                if (reaction.emoji.name == "✅") {
                                    message.edit(new Discord.MessageEmbed()
                                        .setDescription(`${kisi} teklifi KABUL etti ! `)
                                        .setColor("GREEN")
                                        .setImage("https://media.giphy.com/media/3ohs7Qa1M9DxGaI94A/giphy.gif"))
                                    s++
                                    setTimeout(function () {
                                        message.delete();
                                    }, 10000)
                                } else if (reaction.emoji.name == "❌") {
                                    message.edit(new Discord.MessageEmbed()
                                        .setDescription(`${kisi} teklifi Red etti ! `)
                                        .setColor("RED")
                                        .setImage("https://64.media.tumblr.com/570c72e87348788ecb401214099f4878/tumblr_oreel7hC1q1ujmvy2o1_1280.jpg"))
                                    s++
                                    setTimeout(function () {
                                        message.delete();
                                    }, 10000)
                                }
                            }
                        }
                    }
                });
            })
    }
}
