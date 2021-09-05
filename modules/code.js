  
const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({

code: {type: mongoose.SchemaTypes.String, default: null},

expiresAt: {type: mongoose.SchemaTypes.String, default: null},

plan: {type: mongoose.SchemaTypes.String, default: null},


});

module.exports = mongoose.model('codes', guildConfigSchema);