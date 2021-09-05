const Discord = require('discord.js')
const Command = require('../../structures/Command')
const User = require('../../modules/user')
module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addsubscribtion',
      aliases: ['addsub'],
      description: `adds sub`,
      category: 'Owner',
      ownerOnly: true
    })
  }

  async run (message, args) {
    const user =
      message.mentions.members.last() ||
      message.guild.members.cache.get(args[0])

    if (!user) {
      return message.channel.send('**[<:wrong:862267813946064916>] Please provide a user to extend theirs subscription!**')
    }

    let number = args[1]
    if (!number) return message.channel.send('**[<:wrong:862267813946064916>] Please provide the day limit you want to extend!**')
    number = parseInt(number) * 86400000

    await User.findOne({ userId: user.id }, async (err, data) => {
      if (!data) {
        await User.create({
          userId: user.id,
          Day: 1,
          NextUpdate: Date.now() + 86400000
        })
        return message.channel.send(
          "**[<:wrong:862267813946064916>] Couldnt find the user in the database schema**"
        )
      }

      if (data.isPremium === 'false') return message.channel.send('**[<:wrong:862267813946064916>] This user is not a premium gen user!**')

      data.premium.expiresAt = parseInt(data.premium.expiresAt) + parseInt(number)
      await data.save()
      return message.channel.send(
        '**[<:check:862267972885676032>]** Successfuly extended users subscription! Added ' +
          number / 86400000 +
          ' days to ' +
          `${user}'s premium subscription`
      )
    })
  }
}
