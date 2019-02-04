import { cloneDeep, uniq } from 'lodash'

import { CreateBoardRequest, Board, DEFAULT_BOARD_SECTION_SIZE } from '../../models/Board'
import { BoardMatrix, IBoardMatrixValidation } from '../../models/BoardMatrix'
import { CompleteBoardError } from '../../models/Error'

import { CellService } from '../CellService'
import { BoardMatrixService } from './BoardMatrixService'
import { generateRandomNumber } from '../../utilities/generateRandomNumber'

import { CellRepository } from '../../repositories/CellRepository'
import { BoardRepository } from '../../repositories/BoardRepository'
class BoardService {

  /**
   * @param boardId boardId to get
   * @returns Returns Board
   */
  async getById(boardId: number): Promise<Board> {
    const boardEntity = await BoardRepository.getBoardById(boardId)
    const cellEntities = await CellRepository.getByBoardId(boardId)
    return new Board(boardEntity, cellEntities)
  }

  /**
   * @param createBoardRequest Create booking request
   * @returns Returns a created Board with cells
   */
  async create(createBoardRequest: CreateBoardRequest): Promise<Board> {
    const createdBoardId = await BoardRepository.create(createBoardRequest)
    return this.getById(createdBoardId)
  }

  /**
   * @param boardId board id to reset
   * @returns Returns a Board that is reset
   */
  async reset(boardId: number): Promise<Board> {
    await CellService.resetByBoardId(boardId)
    return this.getById(boardId)
  }

  /**
   * @param boardId board id to validate
   * @returns Returns a list of indexes of invalid rows, columns and sections
   */
  async validateDuplication(boardId: number): Promise<IBoardMatrixValidation> {
    const board = await this.getById(boardId)
    const boardMatrix = this.convertBoardToBoardMatrix(board)
    return BoardMatrixService.validateDuplication(boardMatrix)
  }

  /**
   * @param boardId board id to complete
   * @returns completed board
   */
  async complete(boardId: number): Promise<Board> {
    const board = await this.getById(boardId)
    const boardMatrix = this.convertBoardToBoardMatrix(board)
    const {rows, columns, sections} = BoardMatrixService.validateDuplication(boardMatrix)
    const hasDuplicate = rows.length > 0 || columns.length > 0 || sections.length > 0
    if (hasDuplicate) {
      throw new CompleteBoardError('Board has a duplicate number. Please validate')
    }
    const canCompleteBoard = BoardMatrixService.canComplete(boardMatrix)
    if (!canCompleteBoard) {
      throw new CompleteBoardError('Board cannot be completed. Please try again')
    }

    await BoardRepository.complete(boardId)
    return this.getById(boardId)
  }

  /**
   * @param boardId board id to solve
   * @returns Returns a mutated Board object
   */
  async solve(boardId: number): Promise<Board> {
    const board = await this.getById(boardId)
    const boardMatrix = this.convertBoardToBoardMatrix(board)
    const solvedMatrix = BoardMatrixService.solveBoard(boardMatrix) as BoardMatrix

    // mutate board.cells
    board.cells.forEach((cell) => {
      cell.value = solvedMatrix[cell.column][cell.row]
    })

    return board
  }

  /**
   * @param board Board to convert to boardMatrix
   * @returns Returns a corresponding boardMatrix
   */
  private convertBoardToBoardMatrix(board: Board): BoardMatrix {
    const boardMatrix = BoardMatrixService.generateEmptyBoard(board.size)
    board.cells.forEach((cell) => {
      boardMatrix[cell.column][cell.row] = cell.value
    })
    return boardMatrix
  }
}

const boardServiceInstance = new BoardService()
export {boardServiceInstance as BoardService}
