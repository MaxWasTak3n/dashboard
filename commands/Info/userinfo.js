const { MessageEmbed } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "userinfo",

run: async (client, message, args) => {
  const mainVars = require("../../index")
  const embedColor = mainVars.getembedColor(client, message.guild)
  const mention = message.mentions.users.first() || message.author;
  const target = message.guild.members.cache.get(mention.id);

  if(!mention) {
    return message.channel.send("Mention a valid user.");};

  let userInfoEmbed = new MessageEmbed()
    .setTitle(`${target.user.username}'s information`)
    .addFields({
      name: 'Created At:',
      value: '`' + `${moment(mention.createdAt).format("MMM Do YYYY, h:mm:ss a")} (${moment(mention.createdAt).startOf('day').fromNow()})` + '`',
      inline: true
    },{
      name: 'Joined At:',
      value: '`' + `${moment(target.joinedAt).format("MMM Do YYYY, h:mm:ss a")} (${moment(target.joinedAt).startOf('day').fromNow()})` + '`',
    },{
      name: 'ID:',
      value: '`' + `${target.user.id}` + '`',
      inline: true
    },{
      name: 'Is a bot?',
      value: '`' + `${target.user.bot ? 'Yes' : 'No'}` + '`',
      inline: true
    },{
      name: 'Avatar URL:',
      value: "[Click me](" + mention.avatarURL() + ")",
      inline: true
    })
    .setFooter("Requested by: " + message.author.tag, message.author.displayAvatarURL())
    .setColor(embedColor)
    .setThumbnail(mention.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  message.reply({ embeds: [userInfoEmbed]});}};