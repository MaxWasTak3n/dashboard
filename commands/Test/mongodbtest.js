const test = require("../../models/testSchema");

module.exports = {
  name: "test",
  run: (client, message, args) => {
    test.findOne()
      .then((data) => {
        if(data) {
          message.channel.send(data['test'])
        } else if (!data) {
          message.channel.send("Set the welcome channel to <#" + message.mentions.channels.first().id + ">")
          data = new test({
            test: args[0]
          });
          data.save()
        }
      })
  }
}