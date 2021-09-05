const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    crunchyroll: {
        type: Array,
        default: []
    },
    hulu: {
        type: Array,
        default: []
    },
    netflix: {
        type: Array,
        default: []
    },
    nordvpn: {
        type: Array,
        default: []
    },
    rockstar: {
        type: Array,
        default: []
    },
    steam: {
        type: Array,
        default: []
    }
});

const model = mongoose.model("bot accounts", schema);

module.exports = model;