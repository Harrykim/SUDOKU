import knex from '../config/knex'

import { CreateBoardRequest, Board, BoardDifficulty } from '../models/Board'
import { CreateCellEntity, ICellEntity, UpdateCellRequest } from '../models/Cell'
import { NotFoundError } from '../models/Error'
import { BoardMatrixService } from '../services/BoardService/BoardMatrixService'


const cellTableName = 'cells'
class CellRepository {

  /**
   * @param boardId board id that contains cell id
   * @param cellId cell id to get
   * @returns ICellEntity
   */
  async getById(boardId: number, cellId: number): Promise<ICellEntity> {
    const cell: ICellEntity = (await knex(cellTableName).where('boardId', boardId).andWhere('id', cellId))[0]
    if (!cell) {
      throw new NotFoundError('cellId')
    }

    return cell
  }

  /**
   * @param boardId Created board id
   * @param boardSize Created board size
   * @param difficulty Created board difficulty
   * @returns void
   */
  async createByBoardId(boardId: number, boardSize: number, difficulty: BoardDifficulty): Promise<void> {
    const matrix = BoardMatrixService.generateBoard(boardSize, difficulty)
    const createCells: CreateCellEntity[] = []
    for (let i = 0; i < matrix.length; i++) {
      for (let k = 0; k < matrix.length; k++) {
        createCells.push(new CreateCellEntity(boardId, k, i, matrix[i][k]))
      }
    }
    await knex(cellTableName).insert(createCells)
  }

  /**
   * @param boardId board id to reset
   * @returns void
   */
  async resetByBoardId(boardId: number): Promise<void> {
    await knex(cellTableName).update({value: null}).where('isDefault', 0)
  }

  /**
   * @param boardId board id to reset
   * @returns ICellEntity[]
   */
  async getByBoardId(boardId: number): Promise<ICellEntity[]> {
    const cells: ICellEntity[] = await knex(cellTableName).where('boardId', boardId)
    return cells
  }

  /**
   * @param boardId board id that has cell id
   * @param cellId cell id to update
   * @returns ICellEntity
   */
  async update(boardId: number, cellId: number, update: UpdateCellRequest): Promise<ICellEntity> {
    await knex(cellTableName).update({value: update.value}).where('boardId', boardId).andWhere('id', cellId)
    return this.getById(boardId, cellId)
  }
}

const cellRepositoryInstance = new CellRepository()
export {cellRepositoryInstance as CellRepository}
