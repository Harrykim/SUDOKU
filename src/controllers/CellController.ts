import { Router } from 'express'

import { BoardService } from '../services/BoardService/BoardService'
import { CellService } from '../services/CellService'
import { UpdateCellRequest } from '../models/Cell'
import { NotFoundError } from '../models/Error'

const router = Router({mergeParams: true})

export const CellController = router

router.put('/:cellId',
  async function(req, res, next) {
    try {
      const boardId = parseInt(req.params.boardId, 10)
      const cellId = parseInt(req.params.cellId, 10)
      const board = await BoardService.getById(boardId)
      const cellIds = board.cells.map((cell) => cell.id)
      if (!cellIds.includes(cellId)) {
        throw new NotFoundError('cellId', `Cell, ${cellId} does not belong to the board`)
      }

      const updateCell = new UpdateCellRequest(board, req.body)
      const cell = await CellService.update(boardId, cellId, updateCell)
      res.send({cell})
    } catch (error) {
      next(error)
    }
  }
)
