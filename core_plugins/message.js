const { log } = require('./logger')

module.exports = (message, prefix) => {
    if(message.author.bot || !message.content.startsWith(prefix)) return

    const ban = Core.config.gbans.filter(b => b.id == message.author.id)[0]
    if(ban) return message.channel.send(new Core.embeds.embed('error', { title: `It looks like you've been globally banned.`, description: ban.reason ? ban.reason : undefined }))

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = Core.commands.get(command)
    if(!cmd) return

    if(cmd.info.category == 'dev' && message.author.id != Core.config.core.owner) return

    let p = []
    cmd.info.perms.forEach(perm => {
        if(!message.member.hasPermission(perm)) p.push(up(perm.replace(/_/g, ' ').toLowerCase()))
    })
    if(p.length != 0) return message.channel.send(new Core.embeds.erreb({ description: `This command requires permission: \`${p.join('`, `')}\`` }))
    let bp = []
    cmd.info.botperms.forEach(perm => {
        if(!message.guild.member(Core.user).hasPermission(perm)) bp.push(up(perm.replace(/_/g, ' ').toLowerCase()))
    })
    if(bp.length != 0) return message.channel.send(new Core.embeds.erreb({ description: `Bot for this command requires permission: \`${bp.join('`, `')}\`` }))

    if(cmd.info.voice && !message.member.voiceChannel) return message.channel.send(new Core.embeds.erreb({ description: `You must be on voice channel to use this command` }))

    cmd.run({ message, args, prefix }).catch(err => Core.anticrash(message, err))
    if(Core.config.logs.commands.enabled) log(command, message)
}