const Discord = require("discord.js");
const {
    MessageEmbed
} = require('discord.js');
const Accounts = require("../../database/schemas/accounts");

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'stock',
        aliases: [ 'accounts', 'stocks'],
        description: `Displays Current Venus Account Stock`,
        category: 'Venus Generator',
      });
    }

    async run(message, args) {
        
      const account = message.client.accounts.get('accounts')
        
      const embed = new MessageEmbed()
      .setTitle(`Current Accounts Stock`)
      .setColor('GREEN')
      .setFooter('Venus Products')
   
      .addField("crunchyroll", account.crunchyroll.length ? account.crunchyroll.length : "Out of Stock", true)
      .addField("hulu", account.hulu.length ? account.hulu.length : "Out of Stock", true)
      .addField("netflix", account.netflix.length ? account.netflix.length : "Out of Stock", true)
      .addField("nordvpn", account.nordvpn.length ? account.nordvpn.length : "Out of Stock", true)
      .addField("rockstar", account.rockstar.length ? account.rockstar.length : "Out of Stock", true)
      .addField("steam", account.steam.length ? account.rockstar.length : "Out of Stock", true)

      return message.channel.send(embed)
      

  };
};