const Discord = require("discord.js");
const ms = require('rhino-ms');
const client = new Discord.Client();
const fetch = require('node-fetch');
const moment = require("moment");
moment.locale("tr");
const db = require("quick.db");

module.exports = {
  name: "mute",
  async execute(message, args, Embed, client) {
    var guild = message.guild;
    if (['930050192424697916'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      await message.channel.send("Bir üye belirtmelisin!");
      await message.react("🚫");
      return;
    }

    /*if (member.roles.cache.has("924317596059312158")) {
      await message.channel.send("Bu üye zaten susturulmuş!").then(x => x.delete({ timeout: 5000 }));
      await message.react("🚫");
      return;
    }*/

    const duration = args[1];
    if (!duration) {
      await message.channel.send(`Geçerli bir süre belirtmelisin!`);
      await message.react("🚫");
      return;
    }

    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if (message.member.roles.highest.position <= member.roles.highest.position) {
      await message.react("🚫");
      await message.channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!").then(x => x.delete({ timeout: 5000 }));
      return;
    }

    if (!member.manageable) {
      await message.react("🚫");
      await message.channel.send("Bu üyeyi susturamıyorum!").then(x => x.delete({ timeout: 5000 }));
      return;
    }

    const iosTime = new Date(Date.now() + ms(args[1])).toISOString();

    await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${member.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ communication_disabled_until: iosTime }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${client.token}`,
      },
    });

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`» Başarılı! ✅\n${member} adlı kullanıcıya susturma uygulandı\n» Yetkili ${message.author}\n» Ceza Sebebi \`${reason}\`\n» Ceza Süresi \`${duration}\``)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`${moment(Date.now()).format("LLL")}`)
      
    let log = await db.fetch(`mlog_${message.guild.id}`)
    if (log) await message.guild.channels.cache.get(log).send(embed);
    await  member.send(Embed("", `🔔** AliBeyy serverinde  \`${reason}\` nedeniyle \`${duration}\` boyunca susturuldun!**`, "GREEN")).catch(err => console.error)
    await message.channel.send(Embed("", `✅** ${member.toString()} başarıyla  \`${reason}\` nedeniyle \`${duration}\` boyunca susturuldu!**`, "GREEN"));
  }
}