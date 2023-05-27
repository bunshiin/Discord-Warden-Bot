const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "küfür",
	execute(message, args, Embed) {
		if (args[0] === "aç") {
			db.set(`kufur_${message.guild.id}`, "acik");
			message.channel.send("Başarılı Şekilde `Aktif` Edildi.");
			return;
		}
		if (args[0] === "kapat") {
			db.delete(`kufur_${message.guild.id}`);
			message.channel.send("Başarılı Şekilde `Deaktif` Edildi");
			return;
		}
		message.channel.send("Lüten `Aktif` yada `Deaktif` Yazın!");
	},
};
