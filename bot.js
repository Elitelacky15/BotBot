const { Client, Collection } = require("discord.js");
const Util = require('./structures/Util');
const mongoose = require("./structures/mongoose");
require('dotenv').config();

module.exports = class Bot extends Client {
  constructor(options = {}, sentry) {
	  super({
      partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: true,
      cachePresences:  true,
      fetchAllMembers: true,
      respawn: true,
      disableMentions: 'everyone',
      messageCacheMaxSize: 25,
      messageCacheLifetime: 10000, 
      messageSweepInterval: 12000,
      ws: {
        intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_EMOJIS",
        'GUILD_MESSAGE_REACTIONS',
        ],
      },
    });
    
    this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    this.commands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.utils = new Util(this);
    this.config = require('./config.json');
    require('discord-buttons')
  }
  

  async start(token = this.token) {
    this.utils.loadCommands()
    this.utils.loadEvents()
    
    mongoose.init();
    

    
    this.login(process.env.DISCORD_TOKEN);

  }

};
