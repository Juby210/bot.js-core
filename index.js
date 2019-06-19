/*
   Copyright 2019 Juby210

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const { Client, Collection } = require('discord.js')
const { hostname } = require('os')

class Core extends Client {
    constructor(opts, config) {
        super(opts)

        this.beta = hostname() == 'juby-pc'
        this.config = config
        this.prefix = config.core.prefix
        this.commands = new Collection()
        this.plugins = new Collection()

        this.console = require('./core_plugins/console')
        this.embeds = require('./core_plugins/embeds')
        this.handleMessage = require('./core_plugins/message')
        this.anticrash = require('./core_plugins/anticrash')

        if(!config.gbans) this.config.gbans = []
        if(config.core.defaultActivity) this.defaultActivity = () => this.user.setActivity(config.core.defaultActivity.text
            .replace('{prefix}', this.prefix).replace('{servers}', this.guilds.size), { type: config.core.defaultActivity.type })

        if(this.beta) this.on('debug', this.console.dbg)
        this.on('ready', () => {
            this.console.info('Ready as ' + this.user.tag)
            require('./core_plugins/loader')()
            this.errorChannel = this.channels.get(config.logs.errors)
            if(config.core.defaultActivity) this.defaultActivity()
        })
        this.on('error', err => {
            this.anticrash(false, err)
        })
        const { serverlog } = require('./core_plugins/logger')
        this.on('guildCreate', g => {
            if(config.logs.servers.enabled) serverlog(g, true)
            if(config.core.defaultActivity) this.defaultActivity()
        })
        this.on('guildDelete', g => {
            if(config.logs.servers.enabled) serverlog(g)
            if(config.core.defaultActivity) this.defaultActivity()
        })

        if(config.core.handleMessage) this.on('message', m => this.handleMessage(m, this.prefix))

        global.up = string => {
            return string[0].toUpperCase() + string.slice(1)
        }

        this.login(config.tokens.discord)
    }
}

module.exports = (disabledEvents, config) => global.Core = new Core({ disabledEvents }, config)