/**
 * Module dependencies.
 */
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
import * as lusca from 'lusca'
import knex from './config/knex'
import { router } from './router'
import { NotFoundError } from './models/Error'
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const debug = require('debug')('ts-express:app')

const { error } = require('dotenv').config()
if (error) {
  debug(error)
  throw error
}

/**
 * Run migration
 */
knex.migrate.latest().then((result) => {
  console.log(result)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})

/**
 * Create Express server.
 */
const app = express()

/**
 * Swagger Docs
 */
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/**
 * Express configuration.
 */

const isTest = process.env.NODE_ENV === 'test'
app.use(logger(process.env.LOG_LEVEL, {
  skip: () => isTest
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

/**
 * routes.
 */
app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const err = new NotFoundError('URL Not Found')
  next(err)
})

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  debug(err)

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.statusCode || 500).send({ message: err.message})
})

module.exports = app
