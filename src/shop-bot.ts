import 'colors'
import { Telegraf } from 'telegraf'

export class ShopBot {
  readonly bot: Telegraf

  constructor(private readonly token: string) {
    this.bot = new Telegraf(this.token)
  }

  async start() {
    try {
      await this.bot.launch()
      console.log(`Bot started successfully!`.yellow.underline.bold)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(`Error while launching bot: ${e.message}`.red.underline.bold)
      }
    }
  }
}
