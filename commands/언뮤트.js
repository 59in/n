const { Permissions } = require("discord.js")
const Schema = require("../models/뮤트")
const config = require("../config.json")


module.exports = {
    name:"언뮤트",
    async execute(message,args){
        const rolealive = await Schema.findOne({serverid:message.guild.id})
        if(!rolealive) return message.reply(`**서버에 뮤트 역할이 등록되지 않았어! ${config.prefix}뮤트역할설정으로 역할을 생성해줘!**`)
        const role = message.guild.roles.cache.find(r=> r.id == `${rolealive.roleid}`)
        if(!role) return message.reply(`**뮤트 역할이 삭제되거나 오류가 발생했어요. ${config.prefix}뮤트역할설정으로 역할을 다시 생성해줘!**`)
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("권한이 없습니다.")
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("**언뮤트 할 유저의 아이디를 입력해주시거나 멘션을 해줘!**")
        user.roles.remove(role).catch((error)=>{
            return message.channel.send("**봇의 권한이 언뮤트 할 대상보다 낮아!**")
        })
        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`${user.user.tag}님을 언뮤트했어!`)
        .setDescription("뮤트하기: ?뮤트")
        .setColor("BLUE")

        message.channel.send({ embeds: [embed] })
    }
}