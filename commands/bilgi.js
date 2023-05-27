const Discord = require('discord.js')
const moment = require('moment')

const botadi = "Redstone"
module.exports = {
  name: "bilgi",
  execute(message, args, Embed, client) {
    let simdikitarih = moment.utc(message.createdAt).format('DD MM YYYY');

    let user = message.mentions.users.first() || message.author;

    let userinfo = {};
    userinfo.avatar= user.displayAvatarURL();
    userinfo.id = user.id;
    userinfo.od1 = message.guild.members.cache.get(user.id).user.presence.activites || "Oynadığı bir oyun yok"
    userinfo.status = user.presence.status.toString()
    .replace("dnd", `**Rahatsız Etmeyin** ⛔`)
    .replace("online", `**Çevrimiçi** 🟢`)
    .replace("idle", `**Boşta** 🌙`)
    .replace("offline", `Çevrimdışı`)
    userinfo.bot = user.bot.toString()
    .replace("false", `Hayır`)
    .replace("true", `Evet`)
    userinfo.sonmesaj = user.lastMessage || "Son yazılan mesaj bulunamadı." || "Son yazılan mesaj gösterilemedi."

    userinfo.dctarih = moment.utc(message.guild.members.cache.get(user.id).user.createdAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')

    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `**Ocak**`)
    .replace("February", `**Şubat**`)
    .replace("March", `**Mart**`)
    .replace("April", `**Nisan**`)
    .replace("May", `**Mayıs**`)
    .replace("June", `**Haziran**`)
    .replace("July", `**Temmuz**`)
    .replace("August", `**Ağustos**`)
    .replace("September", `**Eylül**`)
    .replace("October", `**Ekim**`)
    .replace("November", `**Kasım**`)
    .replace("December", `**Aralık**`)
    userinfo.dctarihkatilma = moment.utc(message.guild.members.cache.get(user.id).joinedAt).format('**YYYY** [Yılında] MMMM [Ayında] dddd [Gününde] (**DD/MM/YYYY**)')
    .replace("Monday", `**Pazartesi**`)
    .replace("Tuesday", `**Salı**`)
    .replace("Wednesday", `**Çarşamba**`)
    .replace("Thursday", `**Perşembe**`)
    .replace("Friday", `**Cuma**`)
    .replace("Saturday", `**Cumartesi**`)
    .replace("Sunday", `**Pazar**`)
    .replace("January", `**Ocak**`)
    .replace("February", `**Şubat**`)
    .replace("March", `**Mart**`)
    .replace("April", `**Nisan**`)
    .replace("May", `**Mayıs**`)
    .replace("June", `**Haziran**`)
    .replace("July", `**Temmuz**`)
    .replace("August", `**Ağustos**`)
    .replace("September", `**Eylül**`)
    .replace("October", `**Ekim**`)
    .replace("November", `**Kasım**`)
    .replace("December", `**Aralık**`)
    const uembed = new Discord.MessageEmbed()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .setTitle('Kullanıcı;')
    .addField(`Şu anda oynadığı oyun`, userinfo.od1, false)
    .addField(`Durum`, userinfo.status, false)
    .setColor('03f2df')
    .addField(`Katılım Tarihi (Sunucu)`, userinfo.dctarihkatilma, false)
    .addField(`Katılım Tarihi (Discord)`, userinfo.dctarih, false)
    .addField(`Kimlik:`, userinfo.id, true)
    .addField(`Botmu:`, userinfo.bot, true)
    .addField(`Roller:`, `${message.guild.members.cache.get(user.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`, false)
    .addField(`Son gönderdiği mesaj:`, userinfo.sonmesaj, false)
    .setFooter(`${botadi} || Kullanıcı Sistemi`)
    message.channel.send(uembed)
} 
}