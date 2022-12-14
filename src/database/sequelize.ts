import { Sequelize } from 'sequelize'
import { getEnvConfig } from '../config/env.config'

getEnvConfig()

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD
})
