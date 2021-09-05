const Discord = require("discord.js");


const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'warn',
        aliases: ["w"],
        description: `Warns s a user.`,
        category: 'mod',
        cooldown: 3,
      });
    }

  async run(message, args) {
      
    if(!message.member.hasPermission(["KICK_MEMEBRS"])){
      return; 
  }
  let warnedUser = message.mentions.users.first(); 
  let reason = message.content.split(' ').slice(2).join(' ');

  if (!warnedUser) {
    const Embed11 = new Discord.MessageEmbed()
    .setTitle(`Warn command`)
    .setColor('0x002fff')
    .setDescription("**Usage : **`warn <@user> [reason]`\n**Description : **warns a person \n\n**Syntax :** `!warn user reason`")
    return message.channel.send(Embed11)

    }
  
  if(warnedUser.id===message.author.id){
      message.reply('**You cannot warn yourself**');
      return;  
  }
  if(warnedUser.id==='756831891058851840'){
      message.reply('**404 iškilo nenumatyta klaida**')
      return; 
  }

  if(warnedUser.id==='434221731184640011'){
      message.reply('** 404 iškilo nenumatyta klaida**'); 
      return; 
  }
  if(!reason){
      message.reply('**Please describe reason**')
      return; 
  }
  const warnEmbed = new Discord.MessageEmbed()
  .setTitle(`**Person has been successfully warned!**`)
  .addField('Warned person', `${warnedUser} with ID ${warnedUser.id}`)
  .addField('Reason', reason)
  .addField('Responsible moderator', `${message.author} with ID ${message.author.id}`)
  .setTimestamp()
  .setColor(0x002fff); 
  message.channel.send(warnEmbed);

  const warnDM = new Discord.MessageEmbed()
  .setTitle('You have been warned!')
  .addField('Warned from', `${message.guild}`)
  .addField('Reason', reason)
  .addField('Responsible moderator', `${message.author}`)
  .setDescription('**3 warnings = Auto ban \n If u think its a mistake please let moderators know!**')
  .setTimestamp()
  .setFooter('**This message is auto generated**')     
  .setColor(0x002fff) 

  warnedUser.send(warnDM); 
}}

