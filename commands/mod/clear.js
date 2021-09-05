const Discord = require("discord.js");
const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'clear',
        aliases: ["c", "purge"],
        description: `Clears messages.`,
        category: 'mod',
        cooldown: 3,
      });
    }

    async run(message, args) {

if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
    const permErr = new Discord.MessageEmbed()

        .setDescription('**Tu neturiu teisių atlikti šią komandą**\n**Reikalingos teisės** :`Manage Messages`**OR** `Administrator`')
        .setColor(0xc10000);

    message.channel.send(permErr);
    return;
    
}

if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    const argErr = new Discord.MessageEmbed()
        .setTitle("Purging operation")
        .setDescription("**Naudojimas:** `clear <amount of messages>`\n**Aprašymas:** `ištrina tam tikrą žinučių kiekį`\n\n<:alpha2:778883819414749184>**Sintaksės kodas :**`//clear <amount of messages> (The maximmum is 75)`")
        .setColor(0xc10000)

    message.channel.send(argErr);

    return;
}

let deleteAmount;

if (parseInt(args[0]) > 75) {

    const excessErr = new Discord.MessageEmbed()
        .setDescription('**You can only delete maximum of 75 messages of one time!**')
        .setColor(0xc10000)

    message.channel.send(excessErr);

    return;

}

else { deleteAmount = parseInt(args[0]); }

message.channel.bulkDelete(deleteAmount + 1, true).then()

setTimeout(() => message.reply(`**Successfuly deleted ${deleteAmount} messages from this channel!**`), 2000);
}
};