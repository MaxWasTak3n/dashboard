const glob = require("glob")

module.exports = {
  "name": "reload",
  "aliases": "rel",
  run: (client, message, args) => {
    const idArr = ["846669251989340171", "864432605222797343"]

    if(!idArr.includes(message.author.id)) return;

    client.commands.sweep(() => true)
    glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
      if(err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];
        const pull = require(file);
        if(pull.name) {
          console.log(`Reloaded ${pull.name} (cmd).`)
          client. commands.set(pull.name, pull);
          client. commands.set(pull.name, pull);
        }

        if(pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.name)
          })
        }
      })
    })
    message.channel.send("Reloaded all commands!")
  }
}