import { Router } from 'express'
import { CellController } from './CellController'
import { BoardService } from '../services/BoardService/BoardService'
import { CreateBoardRequest } from '../models/Board'
import { NotFoundError } from '../models/Error'


const router = Router()
router.use('/:boardId/cells', CellController)

export const BoardController = router

router.get('/:boardId',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      if (!boardId) {
        throw new NotFoundError('req.params.boardId')
      }

      const board = await BoardService.getById(boardId)
      res.send({board})
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  async function(req, res, next) {
    try {
      const createBoardRequest = new CreateBoardRequest(req.body)
      const createdBoard = await BoardService.create(createBoardRequest)
      res.send({board: createdBoard})
    } catch (error) {
      next(error)
    }
  }
)

router.post('/:boardId/reset',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      if (!boardId) {
        throw new NotFoundError('req.params.boardId')
      }

      const resetBoard = await BoardService.reset(boardId)
      res.send({board: resetBoard})
    } catch (error) {
      next(error)
    }
  }
)

router.post('/:boardId/validate',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      if (!boardId) {
        throw new NotFoundError('req.params.boardId')
      }

      const validation = await BoardService.validateDuplication(boardId)
      res.send(validation)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/:boardId/complete',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      if (!boardId) {
        throw new NotFoundError('req.params.boardId')
      }

      const completedBoard = await BoardService.complete(boardId)
      res.send({board: completedBoard})
    } catch (error) {
      next(error)
    }
  }
)

router.post('/:boardId/solve',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      if (!boardId) {
        throw new NotFoundError('req.params.boardId')
      }

      const solvedBoard = await BoardService.solve(boardId)
      res.send({board: solvedBoard})
    } catch (error) {
      next(error)
    }
  }
)
