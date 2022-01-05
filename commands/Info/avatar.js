const { MessageEmbed } = require("discord.js");
const mainVars = require("../../index")

module.exports = {
  name: "avatar",
  run: (client, message, args) => {
    const embedColor = mainVars.getembedColor(client, message.guild)
    const mention = message.mentions.users.first() || message.author;
    const target = message.guild.members.cache.get(mention.id);

    const avatarEmbed = new MessageEmbed()
    .setTitle(target.user.username + "'s avatar")
    .setImage(mention.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter("Requested by: " + message.author.tag, message.author.displayAvatarURL())
    .setTimestamp()
    .setColor(embedColor)

    message.channel.send({ embeds: [avatarEmbed] })
  }
}