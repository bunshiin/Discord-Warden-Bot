const Discord = require("discord.js");
module.exports = {
	name: "kick",
	description: "Kullanıcıları serverden atar",
	execute(message, args, Embed) {
		var guild = message.guild;
		if (['930050192424697916'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));
		//Diğer Kısımlar
		let reason = args.slice(1).join(" ");

		const mentionedPlayer = message.mentions.members.first();
		if (!args[0])
			return message.channel
				.send(
					Embed(
						" Hata! ⛔  ",
						"» Lütfen atmak istediğin kullanıcıyı etiketle",
						"FF0000",
						""
					)
				)
				.then((message) => message.delete({ timeout: 5000 }));
		if (!mentionedPlayer)
			return message.channel
				.send(
					Embed(
						"» Hata! ⛔",
						`\`${args[0]}\` bir kullanıcı değil `,
						"FF0000",
						""
					)
				)
				.then((message) => message.delete({ timeout: 5000 }));
		if (!reason)
			return message.channel
				.send(
					Embed(
						"  » Hata! ⛔ ",
						"» Bir kullanıcıyı atmak için Sebep belirtmen gerekiyor",
						"FF0000",
						""
					)
				)
				.then((message) => message.delete({ timeout: 5000 }));

		if (!mentionedPlayer.kickable) {
			return message.channel
				.send(
					Embed(
						"» Uyarı! 🔔 ",
						"Benden daha üst yetkideki kişileri malesefki serverden atamam",
						"FFFF00",
						""
					)
				)
				.then((message) => message.delete({ timeout: 5000 }));
		}
		const sucembed = new Discord.MessageEmbed()
			.setDescription(
				`✅ ${mentionedPlayer} **Adlı Kullanıcı ${reason} Sebebi İle Atıldı.**`
			)
			.setColor("GREEN");
		message.channel.send(sucembed);
		const sucembeddm = new Discord.MessageEmbed()
			.setDescription(
				`${mentionedPlayer} **${guild}** Adlı Sunucudan Atıldın.` +
					"\r\n" +
					`**Sebep: ${reason}**`
			)
			.setColor("RED");
		mentionedPlayer.send(sucembeddm).catch((err) => console.error);

		const kickEmbed = new Discord.MessageEmbed()
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setTitle("» Başarılı! ✅ \n » Bir Kullanıcı Serverden Atıldı ")
			.setDescription(
				` » 🔔 Atılan Kullanıcı: ${mentionedPlayer} \n » 🔔 Kullanıcıyı Atan Eden Yetkili:  ${message.author}`
			)
			.setTimestamp()
			.setColor("004000");
		mentionedPlayer.kick();
		message.guild.channels.cache.get("924317252201873418").send(kickEmbed);
	},
};
