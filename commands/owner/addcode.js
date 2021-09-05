const Discord = require("discord.js");
const schema = require('../../modules/code');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

var voucher_codes = require('voucher-code-generator');

const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'genkey',
        aliases: [ 'addcode', 'gencode' ],
        description: `Gens a code`,
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {
        if (message.member.roles.cache.has('877911249797648494')){
            let codes = [];
        
        
            const plan = args[0];
            const plans = ["daily", "weekly","monthly","lifetime"];
    
            if(!plan) return message.channel.send(`**> Please provide coupon plan**`)
    
            if(!plans.includes(args[0])) return message.channel.send(`**Invalid Plan, available plans:** ${plans.join(", ")}`)
    
    
            let time;
    
            if(plan === "daily") time = Date.now() + 86400000
            if(plan === "weekly") time = Date.now() + (86400000 * 7)
            if(plan === "monthly") time = Date.now() + (86400000 * 30)
            if(plan === "lifetime") time = `lifetime`
    
            
            let amount = args[1];
            if(!amount) amount = 1;
    
            for (var i = 0; i <  amount; i++) {
    
                const codePremium = voucher_codes.generate({
                    pattern: "####-####-####",
                });
                
                const code = codePremium.toString().toUpperCase();
                
                const find = await schema.findOne({
                code: code
                })
    
                if(!find){
                    schema.create({
                        code:code,
                        plan:plan,
                        expiresAt: time
                    });
    
                    codes.push(`\`${i + 1}-\` ${code}`)
    
                }
    
                
    
    
            };
    
            message.channel.send(new Discord.MessageEmbed()
            .setColor('0x00ff2a')
            .setDescription(`**Generated ${codes.length} Premium Code(s)**\n\n${codes.join("\n")}\n\n**Type:** ${plan}\n**Expires:** ${moment(time).format("dddd, MMMM Do YYYY")}`)
            )
    }
         else {
            const ErrorEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Error #1 No Permissions')
            .setDescription('You do not have permission to run this command.\n\nYou are missing role permissions to execute this command.')
            message.channel.send(ErrorEmbed)
        }
    }}