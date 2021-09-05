const Event = require('../../structures/Event');
const discord = require('discord.js')
const User = require('../../modules/user')

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = class extends Event {
    async run(messageReaction, user) {




        const {
            message,
            emoji
        } = messageReaction;

        if (message.guild.me.id === user.id) return;

        let id = user.id.toString().substr(0, 4) + user.discriminator;
        let chann = `ticket-${id}`;


        if (emoji.toString() === "🎫") {

            let role = message.guild.roles.cache.get("853979374964310066");
            let category = message.guild.channels.cache.get("853983123969015808");


            const limit = 2

            let array = []

            message.guild.channels.cache.forEach(channel => {
                if (channel.name == chann) array.push(channel.id)
            });


            if (array.length >= limit) {
                return message.channel.send(`**Ticket limit reached. Limit:** ${limit}`).then((s) => [
                    s.delete({
                        timeout: 5000
                    }).catch(() => {})
                ])
            };

            message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(() => {})
            message.guild.channels.create(chann, {
                permissionOverwrites: [{
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    },
                    {
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                        id: user.id
                    },
                    {
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                        id: role.id
                    },
                    {
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'MANAGE_CHANNELS'],
                        id: message.guild.me
                    },
                ],
                parent: category.id,
                reason: `Ticket Module`,
                topic: `**ID:** ${user.id} | **Tag:** ${user.tag}`
            }).then(async (channel) => {

                const openEmbed = new discord.MessageEmbed()
                    .setColor("0x0091ff")
                    .setDescription(`**Welcome to your ticket ${user}! Staff team will be up to you short!**\n\n<@&853979374964310066> **To close ticket react with the emoji below**\n\n**If you need any products you can find them here ---> ** https://sellix.io/Ali-Shop`)

                const vanityEmbed = new discord.MessageEmbed()
                    .setColor("0x0091ff")
                    .setTitle('**Welcome to Venus Products**')
                    .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated system. If you want to buy something of my choices below please react with the product you would like to buy below. After you send the money the key will be given to you! Venus Products**\n\n> **Vanity spoofer -** <:5028pc:854254494157897777>\n> **Venus generator -** <:8917blurpleticket:854653951387500544>\n> **I don't want to buy anything -** <:2379discordcrossemojiv2:854255986158993459>`)




                channel.send(openEmbed);
                //const closeEmbed = new discord.MessageEmbed()
                //.setColor("0x0091ff")
                //.setDescription(`**Please react with the emoji below to delete the ticket**`)
                //delete


                //channel.send(closeEmbed).then((pog) => {
                //pog.react('🗑️')
                //})
                //} else if (emoji.toString() === "🗑️") {

                //message.channel.delete();




                //vanity pirkimas
                channel.send(vanityEmbed).then((pog) => {
                    pog.react('<:5028pc:854254494157897777> ')
                    pog.react('<:8917blurpleticket:854653951387500544>')
                    pog.react('<:2379discordcrossemojiv2:854255986158993459>')
                })

            })
            // Venus Generator PIRKIMAS
        }
        if (emoji.id === "854653951387500544" && message.channel.name.startsWith("ticket")) {
            const alexEmbed = new discord.MessageEmbed()
                .setTitle('**Welcomne Venus Generator!**')
                .setDescription("<a:whitearrow:855080253617078272> **Hello! This is an automated system. We see you selected Venus Generator choice please select it's duration reacting with the emojis below**\n\n> **Weekly - 1️⃣**\n> **Monthly - 2️⃣**\n> **Lifetime - 3️⃣**\n> **Showcase - <:ShowcaseBadge:863125829055676417>**")
                .setColor("0x0091ff")
            message.channel.send(alexEmbed).then(MessageReaction => {
                MessageReaction.react('1️⃣');
                MessageReaction.react('2️⃣');
                MessageReaction.react('3️⃣');
                MessageReaction.react('<:ShowcaseBadge:863125829055676417>');
            })
        } else if (emoji.toString() === "<:ShowcaseBadge:863125829055676417>" && message.channel.name.startsWith("ticket")) {
            message.channel.send("**Generator showcase ( SMALL VIDEO ) :** https://cdn.discordapp.com/attachments/856656518728646686/862756939674812446/2021-07-08_21-01-32.mp4")

        } else if (emoji.toString() === "1️⃣" && message.channel.name.startsWith("ticket")) {
            const aweeklyEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Venus Generator Weekly selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(aweeklyEmbed)
            message.channel.send("**Total of - 15 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")

        } else if (emoji.toString() === "2️⃣" && message.channel.name.startsWith("ticket")) {
            const monthEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Venus Generator Monthly selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(monthEmbed)
            message.channel.send("**Total of - 25 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")

        } else if (emoji.toString() === "3️⃣" && message.channel.name.startsWith("ticket")) {
            const lifeEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Venus Generator Lifetime selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(lifeEmbed)
            message.channel.send("**Total of - 40 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")

        } else if (emoji.toString() === "<:2379discordcrossemojiv2:854255986158993459>" && message.channel.name.startsWith("ticket")) {
            message.delete();

        }

        //if (emoji.id === "854254494157897777") {
        //  const durationEmbed = new discord.MessageEmbed()
        //    .setTitle('**Welcome to Vanity !**')
        //  .setColor("0x0091ff")
        //.setDescription(`<a:whitearrow:855080253617078272> **Hello! This is an automated system. We see you selected Vanity Spoofer choice please select it's duration reacting with the emojis below**\n\n> **Weekly - 🟡**\n> **Monthly - 🟢**\n> **Lifetime - 🔴**`)
        // message.channel.send(durationEmbed).then(MessageReaction => {
        //   MessageReaction.react('🟡');
        // MessageReaction.react('🟢');
        //MessageReaction.react('🔴');
        //})
        //} else if (emoji.toString() === "🟡") {
        // const weeklyEmbed = new discord.MessageEmbed()
        //  .setColor("0x0091ff")
        // .setTitle('**Vanity Weekly selected!**')
        // .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
        //message.channel.send(weeklyEmbed)
        //message.channel.send("**Total of - 6 EUR. Follow the videos BELOW!**")
        //}



        if (emoji.id === "854254733795131392" && message.channel.name.startsWith("ticket")) {
            const staffEmbed = new discord.MessageEmbed()
                .setTitle('**Staff aplication!**')
                .setDescription("<a:whitearrow:855080253617078272>  **Hello! This is an automated message. Staff team will be short up to you. If we don't respond please fill this aplication. Good luck!**")
                .setColor("0x0091ff")
            message.channel.send(staffEmbed)




        }
        if (emoji.id === "854254494157897777" && message.channel.name.startsWith("ticket")) {
            const durationEmbed = new discord.MessageEmbed()
                .setTitle('**Welcome to Vanity !**')
                .setColor("0x0091ff")
                .setDescription(`<a:whitearrow:855080253617078272> **Hello! This is an automated system. We see you selected Vanity Spoofer choice please select it's duration reacting with the emojis below**\n\n> **Weekly - 🟡**\n> **Monthly - 🟢**\n> **Lifetime - 🔴**\n> **Vanity Showcase - <:2d64738624bf38dfcf8d9390283509ba:863132364921110529> **`)
            message.channel.send(durationEmbed).then(MessageReaction => {
                MessageReaction.react('🟡');
                MessageReaction.react('🟢');
                MessageReaction.react('🔴');
                MessageReaction.react('<:2d64738624bf38dfcf8d9390283509ba:863132364921110529>');
            })

        } else if (emoji.toString() === "<:2d64738624bf38dfcf8d9390283509ba:863132364921110529>" && message.channel.name.startsWith("ticket")) {
            message.channel.send("**Vanity Showcase ( MEDIUM VIDEO ) :**https://cdn.discordapp.com/attachments/841570520439980082/863131738427228170/Vanity_Spoofer_Showcase_Trim.mp4")  

        } else if (emoji.toString() === "🟡" && message.channel.name.startsWith("ticket")) {
            const weeklyEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Vanity Weekly selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(weeklyEmbed)
            message.channel.send("**Total of - 6 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")

        } else if (emoji.toString() === "🟢" && message.channel.name.startsWith("ticket")) {
            const monthlyEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Vanity Monthly selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(monthlyEmbed)
            message.channel.send("**Total of - 8 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")
            
        } else if (emoji.toString() === "🔴" && message.channel.name.startsWith("ticket")) {
            const lifetimeEmbed = new discord.MessageEmbed()
                .setColor("0x0091ff")
                .setTitle('**Vanity Lifetime selected!**')
                .setDescription(`<a:whitearrow:855080253617078272>  **Hello! This is an automated instruction please follow the videos below to do everything correctly. If something goes wrong contact staff team!**`)
            message.channel.send(lifetimeEmbed)
            message.channel.send("**Total of - 15 EUR. Follow the videos BELOW!**")
            message.channel.send("https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/PSP_MoneyPool_3_GIF.gif")
            message.channel.send("**PAYPAL EMAIL - DM **<@841534308941824081>")
        }


    }
}