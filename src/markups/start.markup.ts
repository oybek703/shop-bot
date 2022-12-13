import { startButtons } from '../settings/buttons'
import { ReplyKeyboardMarkup } from 'node-telegram-bot-api'

export const startMarkup: ReplyKeyboardMarkup = {
  keyboard: [
    [{ text: startButtons.selectProduct }],
    [{ text: startButtons.aboutShop }, { text: startButtons.settings }]
  ],
  resize_keyboard: true
}
