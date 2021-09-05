const Discord = require("discord.js");


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'ban',
        aliases: ["b"],
        description: `Bans a user from the guild.`,
        category: 'mod',
        cooldown: 3,
      });
    }

    async run(message, args) {


    let member = message.mentions.members.first(); 

    let reason = message.content.split(" ").slice(2).join(" ");

    if (!member) {      
      const info = new Discord.MessageEmbed()

        .setTitle("Ban Operation")
        .setDescription(
          "**Usage : **`ban <@user> [reason]`\n**Description : **bans person (permenantly) \n\n**Syntax :** `!ban user reason`"
        )
        .setColor(0x002fff);

      message.channel.send(info);

      return;
    }


    if (member.id === message.author.id) {   
      message.react("<:pink_cross:769480413236035604>");
      return;
    }
    
    
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) { 

      const permErr = new Discord.MessageEmbed()

        .setDescription(
          "**You're not autorizhed to this command!**\n**You do not have the rights to do this you need : **`Ban Members` OR `Administrator`"
        )
        .setColor(0x002fff);

      message.channel.send(permErr);

      return;
    }

    if (
      member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR"]) 
    ) {

      const permErr2 = new Discord.MessageEmbed()

        .setDescription(
          "**You cannot ban this persom!**"
        )
        .setColor(0x002fff);

      message.channel.send(permErr2);
    
      return;
    }

  
    
    member.ban().then((member) => {

      const success = new Discord.MessageEmbed()

        .setTitle("Successfully banned a person!")
        .setDescription(`**${member.displayName} successfully banned**`)
        .addField("Banned person", `with ID: ${member.id}`)
        .addField(
          "Responsible moderator",
          `${message.author.tag} with ID: ${message.author.id}`
        )
        .addField("Reason", reason)
        .setColor(0x002fff)
        .setTimestamp();
        

      message.channel.send(success);

      const banDM = new Discord.MessageEmbed()
      .setTitle('You have been banned from server')
      .setDescription(`You have been banned from **${message.guild}**`)
      .addField('Reason', reason)
      .addField('Responsible moderator', `${message.author.tag} with ID: ${message.author.id}`)
      .setColor(0x002fff)
      .setTimestamp()

      member.send(banDM); 
    });
  }
};
