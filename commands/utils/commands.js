const Discord = require("discord.js");
const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'commands',
        aliases: [ 'generators'],
        description: `Displays Current generators`,
        category: 'Venus Generator',
      });
    }

    async run(message, args) {

        const Embed = new Discord.MessageEmbed()
        
    .setTitle("**Generator available commands**")
    .setColor(0xf05118) 
    .setDescription("**Categories:** ```crunchyroll - hulu - netflix - nordvpn - rockstar - steam```\n**Usage example :** ```!generate rockstar```")
    .setTimestamp()
    message.channel.send(Embed)
    }}