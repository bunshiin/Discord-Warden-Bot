module.exports = {
        name: 'sil',
        description: '',
        execute(message, args, Embed) {
                if (['953669837236895744', '921125707558551622', '927147674971541546'].some((role) => !message.member.roles.cache.has(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komudu kullanabilmek için gerekli izinlere sahip değilsiniz.").then(message => message.delete({ timeout: 10000 }));
                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(Embed("» Hata! ⛔ ", "» Mesajları  `SİLMEM` için gerekli izinlere sahip değilim", "FF0000", ""))

                const sayi = parseInt(args[0]);
                if (isNaN(sayi)) return message.channel.send(Embed("» Hata! ⛔", "Mesaj silmek istiyorsanız 2-100 arası bir değer girin", "FF0000", "")).then(message => message.delete({ timeout: 5000 }));
                if (sayi < 1 || sayi > 99) return message.channel.send(Embed(" »  Hata! ⛔", "Mesaj silmek istiyorsanız 2-100 arası bir değer girin", "FF0000", "")).then(message => message.delete({ timeout: 10000 }));
                message.channel.bulkDelete(sayi + 1, false).then(() => {
                        return message.channel.send(Embed("» Başarılı! ✅", `${sayi} Adet kadar mesaj temizlendi :wastebasket:`, "#1cff00", "")).then(message => message.delete({ timeout: 5000 }));

                })
                        .catch(() => {
                                return message.channel.send(Embed("» Hata! ⛔", "14 günden eski mesajlar silinemez", "FF0000", "")).then(message => message.delete({ timeout: 5000 }));
                        })
        }
}