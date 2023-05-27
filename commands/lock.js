const Discord =require('discord.js')
module.exports = {
    name: "lock",
    async execute(message, args, Embed, client) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

        let channel = message.mentions.channels.first() || message.channel;
        
        let reason;
        if(!message.mentions.channels.first()) {
        if(args[0]) reason = args.slice(0).join(' ');
        };
        if(message.mentions.channels.first()) {
        if(args[1]) reason = args.slice(1).join(' ');
        };
        let = reason;
        
        if(!reason) reasonn = ' Sebep verilmemiş';
        if(reason) reasonn = ` for ${reason} reason.`;
        message.channel.send(Embed("",`✅**${channel} \`${reason}\` Sebebiyle Başarıyla Kilitlendi**`,"GREEN")).then(m => m.delete({timeout: 20000}));
        
        let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
        channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false }, 'Kitleyen: '+message.author.tag);
      
              
}}