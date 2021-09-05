const User = require("../modules/user");

class TimeManager {
    static async getDay(id) {
        let x = await User.findOne({ userId: id }).exec().then(async(doc) => {
            if (!doc) {
                //await User.create({ userId: id, Day: 1, NextUpdate: Date.now() + 86400000 })
                return 1;
            }
            else {
                return doc.Day;
            }
        });
        return x;
    }

    static async checkDay(id) {
        let data = await User.findOne({ userId: id }).exec();
        if (!data) {
           return //await User.create({ userId: id, Day: 1, NextUpdate: Date.now() + 86400000 });
        }
        if (data.NextUpdate < Date.now()) {
            data.NextUpdate = Date.now() + 86400000;
            data.Day += 1;
            data.Generated = 0;
        }
        data.save();
    }
}

module.exports = TimeManager;