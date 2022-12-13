import { DBManager } from '../database/db-manager'
import { startMarkup } from '../markups/start.markup'
import { backButton, selectProductButtons, startButtons } from '../settings/buttons'
import { Messages } from '../settings/messages'
import TelegramBot, {
  BotCommand,
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  KeyboardButton,
  Message
} from 'node-telegram-bot-api'
import { backMarkup } from '../markups/back.markup'
import { selectProductMarkup } from '../markups/select-product.markup'
import { ShopBot } from '../bot/shop-bot'
import { Category } from '../models/category'
import { Product } from '../models/product'

export class Handlers {
  constructor(
    private readonly dbManager: DBManager,
    private readonly bot: TelegramBot,
    private readonly commands?: BotCommand[]
  ) {}

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
    return await this.setBotCommands()
  }

  async setBotCommands() {
    if (this.commands) return await this.bot.setMyCommands(this.commands)
  }

  replyToBotCommands = async (message: Message) => {
    if (message.text === '/start') return await this.start(message)
    if (message.text === '/help') return await this.help(message)
  }

  onText = async (message: Message) => {
    const { text } = message
    const commandTexts = this.commands?.map(({ command }) => `/${command}`)
    if (text && commandTexts?.includes(text)) {
      return await this.replyToBotCommands(message)
    }
    switch (text) {
      case startButtons.aboutShop:
        return await this.sendInfo(message, Messages.aboutShop)
      case startButtons.settings:
        return await this.sendInfo(message, Messages.settings)
      case startButtons.selectProduct:
        return await this.selectProduct(message)
      case backButton.back:
        return await this.start(message)
      case selectProductButtons['semi-finished']:
        return this.getProducts(message, 'semi-finished')
      case selectProductButtons.breads:
        return this.getProducts(message, 'breads')
      case selectProductButtons['ice-creams']:
        return this.getProducts(message, 'ice-creams')
      default:
        console.log(text)
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

  getProducts = async (message: Message, categoryName: keyof typeof selectProductButtons) => {
    const category = await Category.findOne({ where: { name: categoryName } })
    const goods: Product[] = await Product.findAll({ where: { CategoryId: category?.id } })
    const mappedGoods: InlineKeyboardButton[][] = goods.map(({ id, title }) => [
      {
        text: title,
        callback_data: id.toString()
      }
    ])
    return this.bot.sendMessage(
      message.chat.id,
      `Category: ${selectProductButtons[categoryName]}`,
      {
        reply_markup: {
          inline_keyboard: mappedGoods,
          resize_keyboard: true
        }
      }
    )
  }
}
