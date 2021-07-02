const { loadCommands, loadEvents } = require('./Utils/loader')
const Discord = require('discord.js');

const bot = new Discord.Client();
bot.config = require('./Ignore/config');

["commands", "cooldowns", "perms"].forEach(element => bot[element] = new Discord.Collection());

loadEvents(bot);
loadCommands(bot);

bot.login(bot.config.TOKEN)
