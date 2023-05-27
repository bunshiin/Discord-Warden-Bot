const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const db = require('quick.db')
const ms = require('ms');
const moment = require("moment");

require("moment-duration-format");
require('discord-buttons')(client);

moment.locale("tr");

const Embed = require('./utils/embed.js')
client.commands = new Discord.Collection();
const wait = require('util').promisify(setTimeout);
const { prefix, token } = require('./config.json');
const embed = require('./utils/embed.js');


const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
commandFiles.forEach(file => {
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command);
});

client.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
        .on("disconnect", () => console.error("Bot is disconnecting..."))
        .on("reconnecting", () => console.error("Bot reconnecting..."))
        .on("error", (e) => console.error(e))
        .on("warn", (info) => console.error(info));
process.on("unhandledRejection", (err) => { console.error(err) });
process.on("warning", (warn) => { console.error(warn) });
process.on("beforeExit", () => { console.log('Bitiriliyor...'); });

client.on('ready', async () => {
        console.log(`${client.user.tag} Redstone lambaları yakıldı!`);

        const durumlar = [
                "Developer By shuinore & bunshin",
                "youtube/AliBey",
                "!help",
                "Kuralları Okuyunuz!",
                "youtube/AliBey"
        ]

        setInterval(function () {
                let durum = durumlar[Math.floor(Math.random() * durumlar.length)];
                client.user.setActivity(durum);
        }, 5000);

        //let cmfzaman = new Date().getTime() - user.createdAt.getTime(); if(cmfzaman > 604800000){ }

        var kontrol;

        let guild = client.guilds.cache.get("921123757127516200");
        let gMembers = guild.members;
        async function checkUnregisteredMembers() {

                let Rolsuz = gMembers.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0);


                if (Rolsuz && Rolsuz.size >= 1) {

                        let süre = Date.now();
                        console.log(`[Rolsüz Bulundu] Sunucuda rolü olmayan ${Rolsuz.size} üye bulunuyor. Rol dağıtılımına başlanıyor.`);
                        await wait(500);
                        await Rolsuz.forEach((x, index) => setTimeout(async () => {
                                await x.roles.add("923678463355940908");

                        }, 1000));

                        await console.log(`[Roller Verildi] Sunucuda rolü olmayan ${Rolsuz.size} üyeye kayıtsız rolü ${Date.now() - süre} msde verildi.`)
                }
        }

        await checkUnregisteredMembers();
        setInterval(async () => {
                await checkUnregisteredMembers();
        }, 900000);
})

client.on('messageDelete', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.attachments.size && message.attachments.map(x => x.name)[0].endsWith('.txt')) return;

        let log_channel = await message.guild.channels.cache.get("921127671373627422");
        let entry = await message.guild.fetchAuditLogs({ limit: 1, type: "MESSAGE_DELETE" }).then(audit => audit.entries.first()).catch(() => undefined);

        if (entry && entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
                executor = entry.executor;
        } else {
                executor = message.author;
        }

        let content = await _displayContent(message);
        const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setDescription(`🗑️ ${message.author} tarafından gönderilen mesaj ${message.channel.toString()} kanalında ${executor} tarafından silindi.`)
                .setTimestamp()
                .setFooter(`Kullanıcı ID: ${message.author.id} | Mesaj ID: ${message.id}`);

        if (message.attachments.size && !message.attachments.map(x => x.name)[0].endsWith('.txt')) {
                if (message.content) embed.addField("• Mesaj", `\`\`\`${message.content.length < 1800 ? content : "Silinen mesaj yok.."}\`\`\``)
                embed.addField("• Fotoğraf Linki", `[Tıkla!](${message.attachments.map(x => x.proxyURL)})`)
                embed.setImage(message.attachments.map(x => x.proxyURL)[0]);
        } else {
                embed.addField("• Mesaj", `\`\`\`${message.content.length < 1800 ? content : "Silinen mesaj yok.."}\`\`\``)
        }

        return await log_channel.send(embed);

        async function _displayContent(message) {
                if (message.embeds.length && !message.content) return `*${message.embeds.length} embed gösterilmiyor.*`;
                return message.content.replace(/`/g, `\`${String.fromCharCode(8203)}`);
        }
});

const { Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');

client.on("messageUpdate", async (oldMessage, curMessage) => {
        if (curMessage.author.bot) return;
        if (!curMessage.guild) return;
        if (curMessage.attachments.size && curMessage.attachments.map(x => x.name)[0].endsWith('.txt')) return;
        if (oldMessage.content === curMessage.content) return;

        let log_channel = await curMessage.guild.channels.cache.get("921127671373627422");
        let entry = await curMessage.guild.fetchAuditLogs({ limit: 1, type: "MESSAGE_UPDATE" }).then(audit => audit.entries.first()).catch(() => undefined);

        const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(curMessage.author.tag, curMessage.author.avatarURL({ dynamic: true }))
                .setTitle("Mesaja Git")
                .setURL(oldMessage.url)
                .setDescription(`:pencil2: <#${curMessage.channel.id}> adlı kanalda Mesaj Düzenlendi!`)
                .addField("• Eski Mesaj", `\`\`\`${oldMessage.content.replace(/`/g, `\`${String.fromCharCode(8203)}`) || "Bilinmiyor!"}\`\`\``, true)
                .addField("• Yeni Mesaj", `\`\`\`${curMessage.content.replace(/`/g, `\`${String.fromCharCode(8203)}`) || "Bilinmiyor!"}\`\`\``, true)
                .addField("• Detaylı Mesaj", `${diffWordsWithSpace(escapeMarkdown(oldMessage.content), escapeMarkdown(curMessage.content)).map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : result.value).join(' ')}`)
                .setTimestamp()
                .setFooter(`Kullanıcı ID: ${curMessage.author.id} | Mesaj ID: ${curMessage.id}`);

        return await log_channel.send(embed);
});

client.on("messageDeleteBulk", async (messages) => {
        let log_channel = await messages.first().guild.channels.cache.get("921127671373627422");

        let entry = await messages.first().guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE_BULK',
        });

        const auditLog = entry.entries.first();
        const { executor, target } = auditLog;

        const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(`Yetkili: ${executor.tag}`, executor.avatarURL({ dynamic: true }))
                .setDescription(`<#${messages.first().channel.id}> kanalında **${messages.size}** mesaj silindi!`)
                .setTimestamp()

        const output = messages.reduce((out, msg) => {
                const attachments = msg.attachments;
                out += `[${moment(msg.createdTimestamp).format("LLLL")}] ${msg.author.tag} (${msg.author.id
                        }): ${msg.cleanContent ? msg.cleanContent.replace(/\n/g, '\r\n') : ''}${attachments.size
                                ? `\r\n${attachments.map((attachment) => `↳ Attachment: ${attachment.proxyURL}`).join('\r\n')}`
                                : ''
                        }\r\n`;
                return out;
        }, '');

        let buffer = new Buffer.from(output, "utf-8");

        return await log_channel.send({
                embeds: [embed],
                files: [{
                        attachment: buffer,
                        name: `${executor.id}-${messages.first().channel.id}-${messages.first().channel.name}.txt`
                }]
        });
});


client.cooldown = new Discord.Collection();
client.config = {
        cooldown: 1 * 1000
}

client.on("message", async (message) => {
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase();
        if (!message.content.startsWith(prefix)) return;
        if (!client.commands.get(command)) return;

        try {
                client.commands.get(command).execute(message, args, Embed, client);
        } catch (e) {
                console.error(e);
                message.channel.send("Hata oluştu");
        }
})

const { getCode, isUpper } = require("@skyra/char");

client.on('message', async message => {
        if (!message.guild) return false;
        if (message.member.hasPermission("MANAGE_GUILD")) return;

        let DUPLICATED_CHARS_REGEX = /(.)\1{5,}/gi;
        //if(message.content.match(DUPLICATED_CHARS_REGEX)) return false;
        let customEmojisRegExp = /<(?:a)?:[a-z0-9_-]{1,256}:[0-9]{16,19}>/gi;
        let customEmojis = message.content.match(customEmojisRegExp) || [];
        //if (customEmojis) return false;
        async function hesapla(mesaj) {
                mesaj = mesaj.replace(/[\]~!@#$%#^&*()_+-={}:";'.<>?,.\/|\\/[]+\`/g, "")
                const [minimumCapitals, maximumCapitals] = [5, 70]
                if (message.length < minimumCapitals) return null;

                let length = 0;
                let count = 0;

                for (const char of mesaj) {
                        const charCode = getCode(char);
                        if (isUpper(charCode)) count++;
                        length++;
                }

                const percentage = (count / length) * 100;
                return {
                        percentage,
                        value: percentage >= maximumCapitals ? 1 : null
                }
        }

        Promise.resolve(hesapla(message.content)).then(async (docs) => {
                if (message.cleanContent.length >= 6 && docs.value === 1) {
                        await message.delete({ reason: `Capslock açıldı.` });
                        await message.channel.send(Embed("» Uyarı! 🔔", `» Sık büyük harf kullanmayalım lütfen\n » ${message.author} `, "YELLOW")).then(message => message.delete({ timeout: 10000 }));

                        const capslog = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setTitle(" » Uyarı! 🔔 \n » Bir Kullanıcı Capslock Kullandı ")
                                .setDescription(`»  ⛔ Yazdığı Cümle: \`${message.content}\``)
                                .setTimestamp()
                                .setColor("FFFF00")
                        await message.guild.channels.cache.get("921127671373627422").send(capslog);

                        const capslogsend = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setTitle(" » Uyarı! ⛔  ")
                                .setDescription(`» Büyük harflerle yazışmamaya dikkat edin: \n » Yazdığınız Mesaj: \`${message.content}\``)
                                .setTimestamp()
                                .setColor("FFFF00")
                        await message.author.send(capslogsend);
                }
        });
})

client.on('guildMemberAdd', async (member) => {
        let kanal = "923660652202065940";
        let kanal_hosgeldin = "921127418759098388";
        member.roles.add('923678463355940908')
        let cmfzaman = new Date().getTime() - member.user.createdAt.getTime();
        var kontrol;
        if (cmfzaman < 604800000) {
                kontrol = "Güvenilir Değil ⛔"
                await member.send(Embed("» Güvenilir Değil ⛔", "Merhaba Dostum, hesabın açılması üzerinden 1 hafta geçmediği için 1 hafta dolana kadar böyle olmak zorundasın\n Bu yalnızca güvenlik amaçlı. :ok_hand: ", "YELLOW")).catch(err => console.error)
                member.roles.add("964158462533730374")
        }

        if (cmfzaman > 604800000) {
                kontrol = "Güvenli ✅ "
        }

        client.channels.cache.get(kanal).send(Embed(`» 📑 Aramıza hoşgeldin    `, `» 😀 Seni Görmek Güzel ${member}\n» 📁 Seninle Birlikte \`${member.guild.memberCount}\` kişiyiz\n» ⛔ !kayıt \`İSİM YAŞ\` yazarak kayıt olabilirsin\n» ⏱️ Kullanıcı: ${kontrol} `, "YELLOW"))


})





client.on("message", async (message) => {
        if (!message.guild) return false;
        if (message.member.hasPermission("MANAGE_GUILD")) return false;

        const a = ["991790961938141344"]
        if (a.includes(message.channel.id)) return false;

        var rk = await db.fetch(`reklam_${message.guild.id}`);
        if (rk == 'acik') {
                const gif = ["921127418759098388"]
                if (!gif.includes(message.channel.id)) {
                        const gif2 = ["https://c.tenor.com/", "www.youtube.com", "https://www.curseforge.com/minecraft/", "https://www.planetminecraft.com", "https://tenor.com/", "https://media.giphy.com/", "https://www.youtube.com/shorts", "https://c.tenor.com/"]
                        if (gif2.some(word => message.content.includes(word))) return;
                }

                const fotovideoid = ["923612896309706783"]
                if (!fotovideoid.includes(message.channel.id)) {
                        const fotovideo = ["www.youtube.com", "https://www.curseforge.com/minecraft/", "https://www.planetminecraft.com", "https://tenor.com/", "https://media.giphy.com/", "https://www.youtube.com/shorts"]
                        if (fotovideo.some(word => message.content.includes(word))) return;
                }

                let LINKS_REGEX = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
                let DISCORD_INVITES_REGEX = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/g;

                if (LINKS_REGEX.test(message.content) || DISCORD_INVITES_REGEX.test(message.content)) {
                        if (message.deletable) await message.delete({ reason: "Reklam Engeli!" });

                        const reklamEmbed = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setTitle("» Uyarı! ⛔\n» Reklam Tespit Edildi")
                                .setDescription(`» 🔔 Reklam Paylaşan Kullanıcı: ${message.author}\n» 🔔 Reklam İçeriği: \n\`${message.content}\``)
                                .setTimestamp()
                                .setColor("YELLOW")

                        await message.guild.channels.cache.get("924317252201873418").send(reklamEmbed);
                        return message.channel.send(Embed("⛔ » Reklam Tespit Edildi ", `» 🔔 Reklam Paylaşan Kullanıcı: ${message.author}`, "RED", "")).then(message => message.delete({ timeout: 10000 }));
                }
        }
})

client.on("message", async (message) => {
        if (message.channel.id == "926952036703035454") { //video fikir
                await Promise.all([
                        message.react("<a:onay:964891782011842620>"),
                        message.react("<a:red:964891782007619654")
                ]);
        }

        if (message.channel.id == "929418413133156393") { //istek öneri
                await Promise.all([
                        message.react("<a:onay:964891782011842620>"),
                        message.react("<a:red:964891782007619654")
                ]);
        }
        if (message.channel.id == "964890537930915920") { //alibey-edit
                await Promise.all([
                        message.react("<a:onay:964891782011842620>"),
                        message.react("<a:red:964891782007619654")
                ]);
        }
        if (message.channel.id == "986645139608981504") { //sky-block istek
                await Promise.all([
                        message.react("<a:onay:964891782011842620>"),
                        message.react("<a:red:964891782007619654")
                ]);
        }

        if (message.attachments.size >= 1 && message.channel.id == "993162921339256832") { //mc build
                await Promise.all([
                        message.react("<a:onay:964891782011842620>"),
                        message.react("<a:red:964891782007619654")
                ]);
        }
});


client.login(token);
