const { MessageEmbed } = require("discord.js")

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'mute',
        aliases: ["m"],
        description: `Mutes a user from the guild.`,
        category: 'mod',
        cooldown: 3,
      });
    }

    async run(message, args) {

        const member = message.mentions.members.first()
        if(!member) return message.reply('Please Mention A User To Mute.')
        member.roles.add('842312518914670634') // Add Mute Role to User
        if(member.roles.cache.has('842312518914670634')) return message.reply('User Is Already Muted.') // If User Is Already Muted.

        const embed = new MessageEmbed()
        .setTitle('User Muted')
        .setDescription(`<@${member.user.id}> Has Been Muted.`)
        .addField('Muted By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed);

    }
}