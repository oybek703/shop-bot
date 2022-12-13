import { Context, Telegraf } from 'telegraf'
import { DBManager } from '../database/db-manager'

export class Handler {
  private readonly bot: Telegraf
  private readonly dbManager: DBManager
  private chatId: number | undefined

  async init(dbManager: DBManager, bot: Telegraf) {
    bot.start(this.start)
    bot.help(this.help)
    await bot.telegram.setMyCommands([
      { command: 'start', description: 'Start shop bot.' },
      { command: 'help', description: 'Get help from bot.' }
    ])
  }

  async start(ctx: Context) {
    const chatId = ctx.message?.chat.id
    const firstName = ctx.message?.from.first_name
    const lastName = ctx.message?.from.last_name
    if (chatId) {
      await ctx.telegram.sendMessage(chatId, `Hi ${firstName || ''} ${lastName || ''} 🖐`, {
        reply_markup: {
          keyboard: [
            [{ text: '🛍 Select product' }],
            [{ text: 'ℹ About shop bot' }, { text: '⚙ Settings' }]
          ]
        }
      })
    }
  }

  async help(ctx: Context) {
    const chatId = ctx.message?.chat.id
    if (chatId) {
      await ctx.telegram.sendMessage(chatId, 'Shop bot 🤖 will help you buy products online🙂')
    }
  }
}
