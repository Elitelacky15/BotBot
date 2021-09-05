const Discord = require('discord.js')
const Command = require('../../structures/Command')
const User = require('../../modules/user')
module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addextragens',
      aliases: ['addgens', 'setgens'],
      description: `adds more gens to a user`,
      category: 'Owner',
      ownerOnly: true
    })
  }

  async run (message, args) {
    const user =
      message.mentions.members.last() ||
      message.guild.members.cache.get(args[0])

    if (!user) {
      return message.channel.send('**[<:wrong:862267813946064916>] Please provide a user you want to add extra generations to!**')
    }

    let number = args[1]
    if (!number) return message.channel.send('**[<:wrong:862267813946064916>] Please select amount of gens you want to add**')
    number = parseInt(number)

    await User.findOne({ userId: user.id }, async (err, data) => {
      if (!data) {
        await User.create({
          userId: user.id,
          Day: 1,
          NextUpdate: Date.now() + 86400000
        })
        return message.channel.send(
          "**[<:wrong:862267813946064916>] Couldnt find the user in the database schemas**"
        )
      }

      data.defaultGens = parseInt(number)
      await data.save()
      return message.channel.send(
        '**[<:check:862267972885676032>]** Successfully changed the gen limit! Daily gens for <@' + user + '> is set to ' + number
      )
    })
  }
}
