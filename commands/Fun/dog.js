const axios = require("axios")
const { MessageEmbed } = require("discord.js")

module.exports = {
  "name": "dog",
  run: (client, message) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)

    axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
      const dogEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Here's the dog you asked for!")
        .setImage(response['data']['message'])
        .setFooter("Aww")
        .setTimestamp();
      message.reply({embeds: [dogEmbed]})
    })
  }
}