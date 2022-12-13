import 'colors'
import TelegramBot, { BotCommand } from 'node-telegram-bot-api'

export class ShopBot {
  bot: TelegramBot
  commands: BotCommand[] = [
    { command: 'start', description: 'Start shop bot.' },
    { command: 'help', description: 'Get help from bot.' }
  ]

  constructor(private readonly token: string) {}

  async start() {
    try {
      this.bot = new TelegramBot(this.token, { polling: true })
      console.log(`Bot started successfully!`.yellow.underline.bold)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
