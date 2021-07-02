const Discord = require('discord.js');
const db = require('quick.db');

module.exports = (bot) => {

    console.log("Bot successfully logged in !");
    bot.user.setPresence({ activity: { name: `Atlas Pub`, type: 'WATCHING' }, status: 'online'}).catch(console.error);

  //perms
    function Maj(str){
        return (str + ' ').charAt(0).toUpperCase() + str.substr(1);
    };

    function embedMaker (title = "Titre", description = "Quelque chose semble causer problème :thinking:", color = "0x82D4F5", image = undefined, thumbnail = undefined) {
        return new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setImage(image)
        .setThumbnail(thumbnail)
        .setDescription(description)
        .setTimestamp();
    };
  
    function embedError (title = "<a:CrossCodingHelp:857960524682756116> | Une erreur est survenue !", description = "Quelque chose semble causer problème :thinking:") {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .setColor("DE2916")
        .setDescription(description)
        .setTimestamp();
    };

    const filter = m => m.author.bot === false;
    const reactFilter =  (reaction) => reaction.emoji.name === 'non' || reaction.emoji.name === 'oui';

    function getmessage (channel) {
        bot.channels.cache.get(channel).awaitMessages(filter, {max: 1}).then((msg) => {
            getmessage(channel);
            msg = msg.first();
            msg.react(bot.guilds.cache.get('706532338858852363').emojis.cache.get('707881853838950401'));
            msg.react(bot.guilds.cache.get('706532338858852363').emojis.cache.get('718059748347609130')).then(() => {
                function getReacts () {
                    msg.awaitReactions(reactFilter, {max: 1})
                    .then(async (react) => {
                        if (db.get(`${msg.guild.id}.${msg.author.id}.warnings`) === null) {
                            await db.set(`${msg.guild.id}.${msg.author.id}`, { warnings: 0 });
                        };
                        react = react.first();
                        react.users.remove(react.users.cache.find(user => user.id !== '858754530148876308'));
                        let reactAuthor = react.users.cache.find(u => u.id !== '858754530148876308');
                        const guildMessage = react.message.channel.guild;
                        reactAuthor = guildMessage.members.cache.find(m => m.id === reactAuthor.id)
                        if (reactAuthor.permissions.has('ADMINISTRATOR') && react.emoji.name === 'non') {
                            db.add(`${msg.guild.id}.${msg.author.id}.warnings`, 1 )
                            console.log(db.get(`${msg.guild.id}.${msg.author.id}.warnings`));
                            msg.guild.channels.cache.get('860472474248806400').send(embedMaker('Pub supprimée', `La pub de <@!${msg.author.id}> a été supprimée du salon <#${msg.channel.id}> ! Il a désormais ${db.get(`${msg.guild.id}.${msg.author.id}.warnings`)} warns !`))
                            msg.author.send(embedError('Pub refusée !', `🚨 __**Warn :**__<@!${reactAuthor.id}> vient de vous avertir pour Pub dans le __Mauvais Salon__. Vous avez un __Total de ${db.get(`${msg.guild.id}.${msg.author.id}.warnings`)} warns__. \n \n ➜ Si vous souhaitez contester votre __Warn__ penser bien à lire le salon <#855797462837362719> et ensuite vous pourrez en discuter avec <@!${reactAuthor.id}>.`))
                            msg.delete().catch();
                        } else if (reactAuthor.permissions.has('ADMINISTRATOR') && react.emoji.name === 'oui') {
                            msg.reactions.cache.get('707881853838950401').remove().catch();
                            msg.reactions.cache.get('718059748347609130').remove().catch();
                        } else {
                            getReacts();
                        };
                    });
                }
                getReacts();   
            });
        })    
    } 
    getmessage('855807673130942504');
    getmessage('855807899308654592');
    getmessage('855808110030749707');
    getmessage('855808226121482260');

    getmessage('855808343633035294');
    getmessage('855808733694918666');
    getmessage('855808789746810924');
    getmessage('855808855462903848');
    getmessage('855809015362355240');

    getmessage('855809573537710100');
    getmessage('855809649448976444');
    getmessage('855809792580386826');
    getmessage('855809920937754636');
    getmessage('855810067379388427');
    getmessage('855810209855307797');
}