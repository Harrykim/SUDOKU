import { Router } from 'express'
import { BoardController } from './controllers/BoardController'
export const router = Router()

router.use('/boards', BoardController)
