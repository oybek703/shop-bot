import { sequelize } from '../database/sequelize'
import { DataTypes, Model } from 'sequelize'

export class Product extends Model {
  declare id: number
  declare name: string
  declare title: string
  declare price: number
  declare quantity: number
  declare CategoryId: number
  declare UserId: number
  declare is_active: boolean
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  },
  { sequelize, underscored: true }
)
