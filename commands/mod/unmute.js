const { MessageEmbed } = require("discord.js")

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'unmute',
        aliases: ["unm"],
        description: `Unmute a user from the guild`,
        category: 'mod',
        cooldown: 3,
      });
    }

    async run(message, args) {

        const member = message.mentions.members.first()
        if(!member) return message.reply('Please Mention A User To Mute.')
        member.roles.remove('842312518914670634') // Removes Mute Role to User
        if(!member.roles.cache.has('842312518914670634')) return message.reply('User Is Already Unmuted.') // If User Is Already Unmuted.

        const embed = new MessageEmbed()
        .setTitle('User Unmuted.')
        .setDescription(`<@${member.user.id}> Is Now Unmuted.`)
        .addField('Unmuted By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}