const Discord = require("discord.js");


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'kick',
        aliases: ["k"],
        description: `Kicks a user from the guild.`,
        category: 'mod',
        cooldown: 3,
      });
    }

    async run(message, args) {


    let member = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(" ");

    if (!member) {     
      const info = new Discord.MessageEmbed()

        .setTitle("Kick operation")
        .setDescription(
          "**Usage : **`kick <@user> [reason]`\n**Description : **kick a person from a discord server\n\n**Syntax :** `!kick user reason`"
        )
        .setColor(0x002fff);

      message.channel.send(info);

      return;
    }


    if (member.id === message.author.id) {   
      message.react("<:pink_cross:769480413236035604>");
      return;
    }
    
    
    if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) { 

      const permErr = new Discord.MessageEmbed()

        .setDescription(
          "**You're not autorizhed to this command!**\n**You do not have the rights to do this you need : **`Kick Members` OR `Administrator`"
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
          "**You cannot kick this person!**"
        )
        .setColor(0x002fff);

      message.channel.send(permErr2);
    
      return;
    }

    
    member.kick().then((member) => {
      if(!reason){
        return message.reply('Write a reason for a kick!\n Or else write `none`'); 
      }

      const success = new Discord.MessageEmbed()

        .setTitle("Successfully kicked a person")
        .setDescription(`**${member.displayName} was succesfully kicked!**`)
        .addField("Kicked person", `with ID: ${member.id}`)
        .addField(
          "Responsible moderator",
          `${message.author.tag} with ID: ${message.author.id}`
        )
        .addField("Reason", reason)
        .setColor(0x002fff)
        .setTimestamp();

      message.channel.send(success);

      const kickDM = new Discord.MessageEmbed()
      .setTitle('You have been kicked!')
      .setDescription(`You have been kicked from **${message.guild}**`)
      .addField('Reason', reason)
      .addField('Responsible moderator', `${message.author.tag} with ID: ${message.author.id}`)
      .setColor(0x002fff) 
      .setTimestamp()

      member.send(kickDM); 
    });
  }
};
