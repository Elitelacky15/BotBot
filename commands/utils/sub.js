const Discord = require("discord.js");
const schema = require('../../modules/code');
const User = require('../../modules/user')
const moment = require('moment');


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'subscription',
        aliases: [ 'sub'],
        description: `Displays Your current premium subscription status`,
        category: 'Venus Generator',
      });
    }

    async run(message, args) {
        
        let user = await User.findOne({
            userId: message.author.id
          });
        
        
        
        if(!user){
           await User.create({
                userId: message.author.id,
                isPremium: "false"
            });

            user = await User.findOne({
                userId: message.author.id
              });

              return message.channel.send(`**You do not have a premium active!**`)
        }

        if(user && user.isPremium === "true") {
            return message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`**Name:** ${message.author.tag}\n**Subscription: Available**\n**Subscription ends in:** ${moment(Number(user.premium.expiresAt)).toNow(true)}`))
        } else {
            return message.channel.send(`**You do not have a premium active!**`)
        }
    
}
};