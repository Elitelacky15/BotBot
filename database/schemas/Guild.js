const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({

guildId: { type: Number },
ticketnumber: { type: Number, default: 0 },



});

module.exports = mongoose.model('guild', guildConfigSchema);