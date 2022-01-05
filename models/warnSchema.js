const mongoose = require('mongoose');

let warnSchema = new mongoose.Schema({
    guildId: String,
    user: String,
    content: Array
});

module.exports = mongoose.model('warn', warnSchema);