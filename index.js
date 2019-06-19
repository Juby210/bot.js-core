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

        if(!config.gbans) this.config.gbans = []

        if(this.beta) this.on('debug', this.console.dbg)
        this.on('ready', () => {
            this.console.info('Ready as ' + this.user.tag)
            require('./core_plugins/loader')()
            if(config.core.handleMessage) this.on('message', m => this.handleMessage(m, this.prefix))
        })

        if(config.logs.servers.enabled) {
            const { serverlog } = require('./core_plugins/logger')
            this.on('guildCreate', g => serverlog(g, true))
            this.on('guildDelete', g => serverlog(g))
        }

        global.up = string => {
            return string[0].toUpperCase() + string.slice(1)
        }

        this.login(config.tokens.discord)
    }
}

module.exports = (disabledEvents, config) => global.Core = new Core({ disabledEvents }, config)