const mainVars = require("../../index")

module.exports = {
  "name": "stalk",
  run: (client, message) => {
    message.channel.send(mainVars.getwelcomeChannel(client, message.guild))
  }
}
