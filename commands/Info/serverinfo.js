const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",

run: async (client, message, args) => {
const mainVars = require("../../index")
const embedColor = mainVars.getembedColor(client, message.guild)
const serverInfoEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(message.guild.name + ' Info')
            .setThumbnail(message.guild.iconURL())
            .addFields({
                name: 'Total Members:',
                value: '`' + `${message.guild.memberCount}` + '`',
                inline: true
            }, {
                name: 'Owner:',
                value: '<@' + `${message.guild.ownerId}` + '>',
                inline: true
            }, {
                name: 'Created At:',
                value: '`' + `${message.guild.createdAt.toDateString()}` + '`',
                inline: true
            }, {
                name: 'Channel Count:',
                value: '`' + `${message.guild.channels.cache.filter(c => c.type !== "GUILD_CATEGORY").size}` + '`',
                inline: true
            }, {
                name: 'Role Count:',
                value: '`' + `${message.guild.roles.cache.size}` + '`',
                inline: true
            }, {
                name: 'Emote Count:',
                value: '`' + `${message.guild.emojis.cache.size}` + '`',
                inline: true
            })
            .setFooter('Requested by: ' + message.author.tag)
       await message.channel.send({
            embeds: [serverInfoEmbed]
        }); }
       
    }