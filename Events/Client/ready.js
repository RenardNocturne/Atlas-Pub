module.exports = (bot) => {

    console.log("Bot successfully logged in !")
  
    bot.user.setPresence({ activity: { name: `Atlas Pub`, type: 'WATCHING' }, status: 'online'}).catch(console.error);
  
    setInterval(updateStatus, 10000)
}