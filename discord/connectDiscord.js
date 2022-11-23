const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const connectDiscord = () => {
  client.on('ready', () => {
    console.log('Bot de discord conectado');
  })
  client.login(process.env.DISCORD_TOKEN);
  
}

const sendMessage = (message) => {
  client.channels.cache.get(process.env.DISCORD_CHANNEL).send(message);
}

module.exports = {
  connectDiscord, 
  client,
  sendMessage
}