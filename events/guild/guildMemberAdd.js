const Event = require('../../structures/Event');
const discord = require('discord.js');


module.exports = class extends Event {

  async run(member) {
  
   const welcomeEmbed = new discord.MessageEmbed()
        .setColor("0x0091ff")
        .setTitle('**Welcome to the Venus products!**')
        .setDescription(`**[EN] Hello ${member}! To purchase, please make a ticket in <#857575768997101578>**\n\n**[EB] Hallo ${member}! Zum Kauf bitte ein Ticket in erstellen <#857575768997101578>**`)
      member.send(welcomeEmbed).catch(() => { })
    
  }
};