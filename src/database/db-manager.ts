import { Sequelize } from 'sequelize'
import { sequelize } from './sequelize'
import '../models/assosiations'

export class DBManager {
  public readonly db: Sequelize

  constructor() {
    this.db = sequelize
  }

  async init() {
    try {
      await this.db.authenticate()
      await this.db.sync({ force: true })
      console.log(`Successfully connected to database!`.blue.underline)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`Error while connecting to database: ${e.message}`.red.underline)
      }
    }
  }
}
