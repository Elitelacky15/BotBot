const Discord = require("discord.js");
const Accounts = require("../../database/schemas/accounts")
const https = require('https');

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'fill',
        aliases: [ 'fillaccounts' ],
        description: `fills accounts`,
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {


        const categories = ["crunchyroll", "hulu", "netflix", "nordvpn", "rockstar", "steam"];
        if (!args[0]) return message.channel.send(`Please pick a category you wanna fill. \n\n**Categories:** ${categories.join(" - ")}`)
        if (!categories.includes(args[0].toLowerCase())) return message.channel.send(`Invalid Category provided. \n\n**Categories:** ${categories.join(" - ")}`);


        let accountsDB = await Accounts.findOne();
        if (!accountsDB) {
            await Accounts.create({
                netflix: []
            });

            accountsDB = await Accounts.findOne();
        }



        if (message.attachments && message.attachments.first()) {


            let myURL = new URL(message.attachments.first().url);
            let body = [];
            let assign = [];


            const getRequest = await https.request(myURL, res => {
                var bodyResponse = '';
                res.setEncoding('utf8')

                res.on('data', chunk => bodyResponse += chunk.toString());
                res.on('end', () => {

                    let accounts = bodyResponse.trim().replace(/,/g, "").replace(/"/g, "").split(/\r\n|\n|\r/).join(" ").split(" ");




                    message.channel.send(`Are you sure you wanna add these accounts: \n\n**${accounts.join(" - ").length < 1200 ? accounts.join(" - ") : `TOO LARGE TO DISPLAY (${accounts.length}) ACCOUNTS` }** \n\ntype **yes** to contine or **cancel** to cancel`);

                    message.channel.awaitMessages(m => m.author.id == message.author.id, {
                        max: 1,
                        time: 30000
                    }).then(async (collected) => {

                        if (collected.first().content.toLowerCase() == 'yes') {

                            const msg = await message.channel.send(`Filling ${accounts.length} accounts into our system.`);
                            const now1 = Date.now()

                            const item = args[0].toLowerCase();
                            if (item === "crunchyroll") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.crunchyroll.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 



                            } else if (item === "hulu") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.hulu.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 

                            } else if (item === "netflix") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.netflix.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 

                            } else if (item === "nordvpn") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.nordvpn.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 

                            } else if (item === "rockstar") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.rockstar.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 


                            } else if (item === "steam") {

                                accounts.forEach(async (account) => {
                                    await accountsDB.steam.push(account)
                                });

                                await accountsDB.save();
                                message.client.accounts.set('accounts', accountsDB) 

                            }


                            const now2 = Date.now()


                            msg.edit(`Successfully saved ${accounts.length}/${accounts.length} ${item} accounts in ${now2 - now1}ms!`)
                        } else message.reply('Operation canceled.');
                    }).catch(() => {
                        message.reply('No answer after 30 seconds, operation canceled.');
                    });



                });


            }).end()




        } else {
            const item = args[0].toLowerCase();
            
            if (!args[1]) return message.channel.send(`Please provide accounts`)
            const accounts = args.slice(1).join(" ").trim().replace(/,/g, "").replace(/"/g, "").split(/\r\n|\n|\r/).join(" ").split(" ");
            
            console.log(accounts)


            const msg = await message.channel.send(`Filling ${accounts.length} accounts into our system.`);
            const now1 = Date.now()


            
            if (item === "crunchyroll") {

                accounts.forEach(async (account) => {
                    await accountsDB.crunchyroll.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 



            } else if (item === "hulu") {

                accounts.forEach(async (account) => {
                    await accountsDB.hulu.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 

            } else if (item === "netflix") {

                accounts.forEach(async (account) => {
                    await accountsDB.netflix.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 

            } else if (item === "nordvpn") {

                accounts.forEach(async (account) => {
                    await accountsDB.nordvpn.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 

            } else if (item === "rockstar") {

                accounts.forEach(async (account) => {
                    await accountsDB.rockstar.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 


            } else if (item === "steam") {

                accounts.forEach(async (account) => {
                    await accountsDB.steam.push(account)
                });

                await accountsDB.save();
                message.client.accounts.set('accounts', accountsDB) 


            };
            const now2 = Date.now()

            msg.edit(`Successfully saved ${accounts.length}/${accounts.length} ${item} accounts in ${now2 - now1}ms!`)

        }




    }
};