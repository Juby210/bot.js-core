const { RichEmbed } = require('discord.js')

class BJSEmbed extends RichEmbed {
    constructor(color, opts) {
        super(opts)

        if(!opts || (opts && !opts.color)) this.setColor(module.exports.colors.default)
        if(color) this.setColor(module.exports.colors[color])
        // if(!opts || (opts && !opts.footer)) this.setFooter('')
    }
}

module.exports.embed = BJSEmbed

module.exports.colors = {
    default: '#29b6f6',
    error: '#ef5350',
    warn: '#fbc02d'
}

module.exports.erreb = class BJSErrorEmbed extends BJSEmbed {
    constructor(opts) {
        super('error', opts)
        if(opts) this.description = `**Error!**\n` + opts.description
    }

    setDescription(d) {
        this.description = `**Error!**\n` + d
    }
}

module.exports.cmdusage = class extends BJSEmbed {
    constructor(cmd, prefix) {
        super('warn', { description: `Usage:\n\n\`${prefix}${cmd.triggers[0]} ${cmd.usage.join(`\`\n\`${prefix}${cmd.triggers[0]} `)}` })
    }
}