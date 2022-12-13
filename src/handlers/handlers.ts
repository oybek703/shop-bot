import { DBManager } from '../database/db-manager'
import { startMarkup } from '../markups/start.markup'
import { startButtons } from '../settings/buttons'
import { Messages } from '../settings/messages'
import TelegramBot, { CallbackQuery, ChatId, Message } from 'node-telegram-bot-api'
import { backMarkup } from '../markups/back.markup'

export class Handlers {
  constructor(private readonly dbManager: DBManager, private readonly bot: TelegramBot) {}

  init = async () => {
    this.bot.on('message', async (message, metadata) => {
      const { type } = metadata
      switch (type) {
        case 'text':
          return await this.onText(message)
      }
    })
    this.bot.on('callback_query', this.onCallBackQuery)
    await this.bot.setMyCommands([
      { command: 'start', description: 'Start shop bot.' },
      { command: 'help', description: 'Get help from bot.' }
    ])
  }

  onCallBackQuery = async (query: CallbackQuery) => {
    const chatId = query.message?.chat.id as ChatId
    const { data } = query
    switch (data) {
      case 'backToStart':
        return await this.start({ ...query.message, from: query.from } as Message)
    }
    return await this.bot.sendMessage(chatId, JSON.stringify(query.message, null, 2))
  }

  onText = async (message: Message) => {
    const { text } = message
    if (message.text === '/start') return this.start(message)
    if (message.text === '/help') return this.help(message)
    if (text === startButtons.aboutShop) return this.aboutShop(message)
    switch (text) {
      case startButtons.aboutShop:
        return this.aboutShop(message)
      case startButtons.settings:
        return this.settings(message)
      case startButtons.selectProduct:
        return this.selectProduct(message)
      default:
        return this.bot.sendMessage(message.chat.id, JSON.stringify(message.from, null, 2))
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

  aboutShop = async (message: Message) => {
    return this.bot.sendMessage(message.chat.id, Messages.aboutShop, {
      parse_mode: 'HTML',
      reply_markup: backMarkup
    })
  }

  settings = async (message: Message) => {
    return this.bot.sendMessage(message.chat.id, Messages.settings, {
      parse_mode: 'HTML',
      reply_markup: backMarkup
    })
  }

  selectProduct = async (message: Message) => {
    return this.bot.sendMessage(message.chat.id, Messages.selectProduct, {
      parse_mode: 'HTML',
      reply_markup: backMarkup
    })
  }
}
