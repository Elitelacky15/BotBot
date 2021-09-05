const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const Accounts = require('../../database/schemas/accounts')
const User = require('../../modules/user')
const moment = require('moment')

const Command = require('../../structures/Command')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'generate',
      aliases: ['generateaccount', 'gen'],
      description: `Generate an account from a cateogry`,
      category: 'Venus Generator',
      cooldown: 3
    })
  }

  async run (message, args) {
    const Embed203 = new Discord.MessageEmbed()
      .setColor('0xff0000')
      .setDescription("**Your'e executing the command in wrong channel!**")

    const Embed204 = new Discord.MessageEmbed()
      .setColor('0xff0000')
      .setDescription('**You do not have the gen role to use this command**')

    if (message.channel.id !== '857575784239464490')
      return message.channel.send(Embed203)
    const genRole = message.guild.roles.cache.get('857575754693738526')

    if (
      !message.member.roles.cache.find(
        r => r.name.toLowerCase() === genRole.name.toLowerCase()
      )
    )
      return message.channel.send(Embed204)

    let user = await User.findOne({
      userId: message.author.id
    })

    if (!user) {
      await User.create({
        userId: message.author.id,
        Day: 1,
        NextUpdate: Date.now() + 86400000
      })

      user = await User.findOne({
        userId: message.author.id
      })
    }

    if (user.isPremium === 'false') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('0xff0000')
          .setDescription('**You are not a premium user**')
      )
    }

    if (user.Generated >= (user.defaultGens || 5)) {
      const errorEmbed = new MessageEmbed()
        .setTitle(`Account Limit Reached`)
        .setDescription(
          `You have already generated **${user.defaultGens ||
            5} accounts**.\n\nYou can generate more in \`${moment.duration(user.NextUpdate - Date.now()).format("H [hours and] m [minutes]")}\``
        )
        .setFooter('Venus Products')
        .setColor('0xff0000')

      return message.channel.send(errorEmbed)
    }

    const categories = [
      'crunchyroll',
      'hulu',
      'netflix',
      'nordvpn',
      'rockstar',
      'steam'
    ]
    if (!args[0])
      return message.channel.send(
        `Please pick a category you wanna generate an account from. \n\n**Categories:** ${categories.join(
          ' - '
        )}`
      )
    if (!categories.includes(args[0].toLowerCase()))
      return message.channel.send(
        `Invalid Category provided. \n\n**Categories:** ${categories.join(
          ' - '
        )}`
      )

    let accountsDB = await Accounts.findOne()
    if (!accountsDB) {
      await Accounts.create({
        netflix: []
      })

      accountsDB = await Accounts.findOne()
    }

    const account = args[0].toLowerCase()

    const outOfStock = new MessageEmbed()
      .setTitle(`Out Of Stock`)
      .setColor('0xff0000')
      .setDescription(
        `Sorry but **${account}** accounts are currently out of stock!`
      )
      .setFooter(`Venus Products`)

    if (!accountsDB[account].length) return message.channel.send(outOfStock)

    const random = Math.floor(Math.random() * accountsDB[account].length)
    const response = accountsDB[account][random]
    const now1 = Date.now()

    try {
      await message.author.send(
        new MessageEmbed()
          .setTitle(`Generated ${account} account`)
          .setColor('GREEN')
          .setDescription(
            `||${response}||\n\n**Accounts Left:** ${accountsDB[account]
              .length - 1}\n**Gens Left:** ${user.defaultGens - (user.Generated + 1)||
              5 - (user.Generated + 1)}`
          )
          .setFooter(`Venus Products`)
      )
    } catch (err) {
      console.log(err)
      return message.reply(
        new MessageEmbed()
          .setTitle(`Closed DMs!`)
          .setDescription(
            `Could not send you your ${account} account because your dms are closed!\n\n**Please open your dms**`
          )
          .setColor('0xff0000')
          .setFooter('Venus Products')
      )
    }

    const now2 = Date.now()

    message.reply(
      `Successfully sent you a **${account}** account in **${now2 - now1}ms**!`
    )

    let newArray = accountsDB[account]
    newArray.splice(newArray.indexOf(response), 1)
    accountsDB[account] = newArray
    await accountsDB.save()
    message.client.accounts.set('accounts', accountsDB)

    user.Generated++
    await user.save()
  }
}
