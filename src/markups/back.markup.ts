import { startButtons } from '../settings/buttons'
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'node-telegram-bot-api'

export const backMarkup: InlineKeyboardMarkup = {
  inline_keyboard: [[{ text: '⏮', callback_data: 'backToStart' }]]
}
