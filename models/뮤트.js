const mongoose = require("mongoose")

const mute = new mongoose.Schema({
    roleid: { type: String },
    serverid: { type: String }
})

const ff = module.exports = mongoose.model("그빌뮤트역할", mute);