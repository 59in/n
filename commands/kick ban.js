const { Permissions , MessageActionRow , MessageSelectMenu , MessageEmbed} = require('discord.js')
module.exports = {
    name:"추방",
    async execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("권한이 없습니다")
        const member = message.mentions.members.first()
        if(!member) return message.reply("유저를 멘션해주세요")
        
        const menu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("옵션을 선택해주세요")
            .addOptions([{
                label:"킥",description:"추방",value:"킥"
            },{
                label:"밴",description:"영구추방",value:"밴"
            }])
        )
        let embed = new MessageEmbed()
        .setTitle("밴/킥")
        .setDescription("아래매뉴로 옵션을 선택해주세요")
        .setColor("GREEN")
        .setTimestamp()

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const sendmsg = await message.channel.send({ embeds : [embed] , components : [menu]})
        const embed1 = new MessageEmbed()
        .setTitle(`${user.tag || user.user.tag}를 추방함`)
        .setDescription(`추방당한 유저 : ${member}\n처리자 : ${message.author}`)
        .setTimestamp()
        .setColor("RED")
        .setImage("https://cdn.discordapp.com/attachments/978281691808423946/999903974385795152/yeet-kick-out-cartoon-u65n7uq0bx0gftde.gif")

        const embed2 = new MessageEmbed()
        .setTitle("유저가 밴당함")
        .setDescription(`밴당한 유저 : ${member}\n 처리자 ${message.author}`)
        .setTimestamp()
        .setColor("RED")
        .setImage("https://cdn.discordapp.com/attachments/892675661246889987/898554800088690758/thor-strike.gif")

        const collector = message.channel.createMessageComponentCollector({
            componentType:"SELECT_MENU",
            time:60000
        })
        collector.on('collect', collected =>{
            const value = collected.values[0]
            if(collected.member.id !== message.author.id) return 
            if(value == "킥"){
                member.kick().then().catch((error)=>{
                    message.reply(`오류가 발생했습니다 ${error}`)
                })
                sendmsg.edit({embeds : [embed1]})
            }
            if(value == "밴"){
                member.ban().then().catch((error)=>{
                    message.reply(`오류가 발생했습니다 ${error}`)
                })
                sendmsg.edit({embeds : [embed2]})
            }
        })

    }
}