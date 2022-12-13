import 'colors'
import { ShopBot } from './bot/shop-bot'
import { getEnvConfig } from './config/env.config'
import { Handlers } from './handlers/handlers'
import { DBManager } from './database/db-manager'

async function start() {
  getEnvConfig()
  const dbManager = new DBManager()
  await dbManager.init()
  const shopBot = new ShopBot(`${process.env.BOT_TOKEN}`)
  await shopBot.start()
  const handler = new Handlers(dbManager, shopBot.bot, shopBot.commands)
  await handler.init()
}

;(async () => await start())()
