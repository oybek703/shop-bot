import { Category } from './category'
import { Product } from './product'
import { User } from './user'
import { Order } from './order'

Category.hasMany(Product)
Product.belongsTo(Category)

Order.belongsTo(Product)
Order.belongsTo(User)
Product.hasMany(Order)

User.hasMany(Product)
User.hasMany(Order)
Product.belongsTo(User)
