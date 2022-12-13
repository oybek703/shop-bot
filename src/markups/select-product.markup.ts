import { selectProductButtons, startButtons } from '../settings/buttons'
import { ReplyKeyboardMarkup } from 'node-telegram-bot-api'

export const selectProductMarkup: ReplyKeyboardMarkup = {
  keyboard: [
    [
      { text: selectProductButtons.fastFood },
      { text: selectProductButtons.breads },
      { text: selectProductButtons.iceCream }
    ],
    [{ text: selectProductButtons.back }, { text: selectProductButtons.checkout }]
  ],
  resize_keyboard: true
}
