const mongoose = require('mongoose');
require('dotenv').config();
module.exports = {
    init: () => {
        const dbOptions = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
        };
    

    mongoose.connect(`mongodb+srv://discordbot:${process.env.PASS}@bot.drb9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);
    mongoose.set('useFindAndModify', false)
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
        console.log('[G] The bot has connected to the database.');

    });
    mongoose.connection.on('disconnected', () => {
        console.log('[R] The bot has disconnected to the database.');

    });
    mongoose.connection.on('err', (err) => {
        console.log('[Y] There was an error connecting.' + err);

    });
    }
}