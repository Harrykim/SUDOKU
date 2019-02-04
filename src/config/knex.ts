import * as Knex from 'knex'
import database from './database'

const knex = Knex(database as any)

export default knex
