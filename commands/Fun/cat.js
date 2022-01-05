const axios = require("axios")
const { MessageEmbed } = require("discord.js")

module.exports = {
  "name": "cat",
  "aliases":["pussy"],
  run: (client, message) => {
    const mainVars = require("../../index")
    const embedColor = mainVars.getembedColor(client, message.guild)

    axios.get("https://api.thecatapi.com/v1/images/search", { headers: {
      'x-api-key': '05b0be56-10e1-427f-b0c7-d0c25479c865'
    }}).then(response => {
      const catEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Here's the cat you asked for!")
        .setImage(response['data'][0]['url'])
        .setFooter("Aww")
        .setTimestamp();
      message.reply({embeds: [catEmbed]})
    })
  }
}