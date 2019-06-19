const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = () => {
    const plugins = readdirSync(Core.config.core.plugins)
    for (const plugin of plugins) {
        try {
            const p = require(join('../', Core.config.core.plugins, plugin))
            Core.plugins.set(p.id, p)
            p.load()
        } catch(err) {
            Core.console.error('Error while loading plugin: ' + plugin)
            console.error(err)
        }
    }
    Core.console.info(`Loaded ${Core.plugins.size} plugins`)
}