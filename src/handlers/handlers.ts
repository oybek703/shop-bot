import { DBManager } from '../database/db-manager'
import { startMarkup } from '../markups/start.markup'
import { backButton, startButtons } from '../settings/buttons'
import { Messages } from '../settings/messages'
import TelegramBot, { Message } from 'node-telegram-bot-api'
import { backMarkup } from '../markups/back.markup'
import { selectProductMarkup } from '../markups/select-product.markup'

export class Handlers {
  constructor(private readonly dbManager: DBManager, private readonly bot: TelegramBot) {}

  init = async () => {
    this.bot.on('message', async (message, metadata) => {
      const { type } = metadata
      switch (type) {
        case 'text':
          return await this.onText(message)
        case 'photo':
          return this.bot.deleteMessage(message.chat.id, String(message.message_id))
        case 'sticker':
          return this.bot.sendSticker(message.chat.id, message.sticker?.file_id as string, {
            protect_content: true
          })
      }
    })
    await this.setBotCommands()
  }

  async setBotCommands() {
    await this.bot.setMyCommands([
      { command: 'start', description: 'Start shop bot.' },
      { command: 'help', description: 'Get help from bot.' }
    ])
  }

  replyToBotCommands = async (message: Message) => {
    if (message.text === '/start') return await this.start(message)
    if (message.text === '/help') return await this.help(message)
  }

  onText = async (message: Message) => {
    const { text } = message
    await this.replyToBotCommands(message)
    switch (text) {
      case startButtons.aboutShop:
        return await this.sendInfo(message, Messages.aboutShop)
      case startButtons.settings:
        return await this.sendInfo(message, Messages.settings)
      case startButtons.selectProduct:
        return await this.selectProduct(message)
      case backButton.back:
        return await this.start(message)
      default:
        return this.bot.sendMessage(
          message.chat.id,
          'Invalid command. Please choose any existing option.'
        )
    }
  }

  start = async (message: Message) => {
    const { id } = message.chat
    const firstName = message.from?.first_name
    await this.bot.sendMessage(id, `Hi ${firstName || ''} 🖐. Welcome to shop bot🙂`, {
      reply_markup: startMarkup
    })
  }

  help = async (message: Message) => {
    const { id } = message.chat
    await this.bot.sendMessage(id, 'Shop bot 🤖 will help you buy products online🙂')
  }

  sendInfo = async (message: Message, data: string) => {
    return this.bot.sendMessage(message.chat.id, data, {
      parse_mode: 'HTML',
      reply_markup: backMarkup
    })
  }

  selectProduct = async (message: Message) => {
    await this.bot.sendMessage(message.chat.id, 'Good step ✅.', {
      reply_markup: { remove_keyboard: true }
    })
    return this.bot.sendMessage(message.chat.id, 'Now select product catalog:', {
      reply_markup: selectProductMarkup
    })
  }
}
