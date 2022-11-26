const Schema = require("../models/도박")
const comma = require("comma-number")
const client = require("../index")

module.exports = {
    name: "돈버리기",
    async execute(message, args) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const wjdqh = await Schema.findOne({ userid: user.id })
        const money = parseInt(args[0]);
        if (!wjdqh.money) return message.reply("**이미 잔액은 0원이야!**")
        if (wjdqh.money = 0) return message.reply("**이미 잔액은 0원이야!**")
        if (isNaN(args[0])) return message.reply("**버릴 금액을 입력해줘!**")
        else {

            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money - money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
            const f = ehqkrduqn.money - money
            message.reply(`**${comma(money)}원을 땅에 버렸어!!\n현재 잔액: ${comma(f)}원**`)
        }
    }
}