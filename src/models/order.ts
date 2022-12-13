import { sequelize } from '../database/sequelize'
import { DataTypes, Model } from 'sequelize'
import { Product } from './product'
import { User } from './user'

export class Order extends Model {
  declare id: number
  declare quantity: number
  declare product_id: number
  declare user_id: number
  declare is_active: boolean
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  },
  { sequelize }
)

Order.belongsTo(Product)
Order.belongsTo(User)
