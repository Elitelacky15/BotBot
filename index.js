const botclient = require("./bot");
const config = require("./config.json");
const disbut = require('discord-buttons');
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
const Nuggies = require('nuggies');
const fs = require('fs');
const Discord = require('discord.js');
const {
    MessageButton,
    MessageActionRow
} = require("discord-buttons");
const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const Guild = require('./database/schemas/Guild')
const db = require ('./models/disable');
const discord = require('discord.js')
const Ticket = require('./database/schemas/Ticket');
const snipes = new Discord.Collection()


// define the client
const bot = new botclient(config);

// load colors
bot.color = require('./colors.js');

//load emojis
bot.emoji = require('./emojis.js');

disbut(bot);

bot.accounts = new discord.Collection









  