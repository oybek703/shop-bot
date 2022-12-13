import { sequelize } from '../database/sequelize'
import { DataTypes, Model } from 'sequelize'

export class User extends Model {
  declare id: number
  declare username: string
  declare first_name: string
  declare last_name: string
  declare is_active: boolean
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    username: DataTypes.STRING,
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
    },
    is_active: DataTypes.BOOLEAN
  },
  { sequelize, underscored: true }
)
