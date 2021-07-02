const db = require('quick.db');

module.exports.run = (bot, message, args, embedMaker, prefix, embedError) => {

    message.guild.members.cache.forEach(member => {
        db.set(`${message.guild.id}.${member.id}.warnings`, 0)
        console.log(db.get(`${message.guild.id}.${member.id}.warnings`));
    });

    message.channel.send(embedMaker('Warns nettoyés !', 'Tous les warns ont été remis à zéro !'))
}

module.exports.help = {
    name: "rwarns",
    category: 'moderation',
    description: "Retire les warns de tout le monde !",
    args: false,
    usage: '',
    cooldown: 10,
    aliases: ["rwarn"],
    userPerms: ['ADMINISTRATOR'],
    botPerms: [],
    deletecmd: true,
}