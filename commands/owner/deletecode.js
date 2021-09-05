const Discord = require("discord.js");
const schema = require('../../modules/code');
const moment = require('moment');

var voucher_codes = require('voucher-code-generator');

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'delcode',
        aliases: [ 'deletecode', 'removecode' ],
        description: `deletes a code`,
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {


      const key = args[0];
      if(!key) return message.channel.send(`**[<:wrong:862267813946064916>] Please provide a key to revoke**`);

      const find = await schema.findOne({
      code: key.toUpperCase()
      });

      if(find){
        await find.deleteOne();
        return message.reply('**[<:check:862267972885676032>] Succesfully deleted the key!**')
      } else {
        return message.channel.send(`**[<:wrong:862267813946064916>] Invalid key provided!**`)
      }

}
};