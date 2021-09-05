const mongoose = require('mongoose')

const guildConfigSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  isPremium: {
    type: mongoose.SchemaTypes.String,
    required: false,
    default: false
  },
  premium: {
    redeemedBy: {
      id: { type: mongoose.SchemaTypes.String, default: null },
      tag: { type: mongoose.SchemaTypes.String, default: null }
    },

    redeemedAt: { type: mongoose.SchemaTypes.String, default: null },

    expiresAt: { type: mongoose.SchemaTypes.String, default: null },

    plan: { type: mongoose.SchemaTypes.String, default: null }
  },

  Day: { type: Number, default: 1 },
  NextUpdate: { type: Number, default: new Date().setHours(24, 0, 0, 0) },
  Generated: { type: Number, default: 0 },
  defaultGens: { type: Number, default: 5 }
})

module.exports = mongoose.model('user', guildConfigSchema)
