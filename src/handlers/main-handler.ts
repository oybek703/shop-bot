import { Telegraf } from 'telegraf'
import { DBManager } from '../database/db-manager'

export class Handler {
  private readonly bot: Telegraf
  private readonly dbManager: DBManager

  async init(dbManager: DBManager, bot: Telegraf) {
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Start shop bot.' },
      { command: 'help', description: 'Get help from bot.' }
    ])
  }

  async handle() {}
}
