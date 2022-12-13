import 'colors'
import { ShopBot } from './shop-bot'
import { getEnvConfig } from './config/env.config'
import { Handler } from './handlers/main-handler'
import { DBManager } from './database/db-manager'

async function start() {
  getEnvConfig()
  const dbManager = new DBManager()
  const shopBot = new ShopBot(`${process.env.BOT_TOKEN}`)
  const handler = new Handler()
  await dbManager.init()
  await shopBot.start()
  await handler.init(dbManager, shopBot.bot)
}

;(async () => await start())()
