import 'colors'
import TelegramBot from 'node-telegram-bot-api'

export class ShopBot {
  bot: TelegramBot

  constructor(private readonly token: string) {}

  async start() {
    try {
      this.bot = new TelegramBot(this.token, { polling: true })
      console.log(`Bot started successfully!`.yellow.underline.bold)
      return { bot: this.bot }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
