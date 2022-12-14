import { sequelize } from '../database/sequelize'
import { DataTypes, Model } from 'sequelize'

export class Category extends Model {
  declare id: number
  declare name: string
  declare is_active: boolean
}

Category.init(
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
  { sequelize, underscored: true }
)
