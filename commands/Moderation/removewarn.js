const { MessageEmbed } = require("discord.js")
const warns = require("../../models/warnSchema")

module.exports = {
  name: "removewarn",
  aliases: ["rmwarn", "remove-warn"],
  run: (client, message, args) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You can't use this command since you do not have the `ADMINISTRATOR` permissions.")
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send("User not found.")
    
    warns.findOne({ guildId: message.guild.id, user: user.user.id }, async(err, data) => {
      if(err) throw err;
      if (data) {
        let number = parseInt(args[1]) - 1
        data.content.splice(number, 1)
        message.channel.send("Successfully removed the role.")
        data.save()
      } else {
        message.channel.send("This user doesn't have any warns in this server.")
      }
    })
  }
}