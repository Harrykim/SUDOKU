import knex from '../config/knex'

import { CreateBoardRequest, Board, IBoardEntity } from '../models/Board'
import { ICellEntity } from '../models/Cell'
import { NotFoundError } from '../models/Error'

import { CellService } from '../services/CellService'
import { CellRepository } from '../repositories/CellRepository'


const boardTableName = 'boards'
class BoardRepository {
  /**
   * @param createBoardRequest Create booking request
   * @returns Returns a created boardId
   */
  async create(createBoardRequest: CreateBoardRequest): Promise<number> {
    const [createdBoardId] = await knex(boardTableName).insert(createBoardRequest).select('id')
    await CellService.createByBoardId(createdBoardId, createBoardRequest.size, createBoardRequest.difficulty)
    return createdBoardId
  }

  /**
   * @param boardId
   * @returns Returns a matching board
   */
  async getBoardById(boardId: number): Promise<IBoardEntity> {
    const board: IBoardEntity = (await knex(boardTableName).where('id', boardId))[0]
    if (!board) {
      throw new NotFoundError('boardId')
    }

    return board
  }

  /**
   * @param boardId
   * @returns void
   */
  async complete(boardId: number): Promise<void> {
    await knex(boardTableName).update({
      completeDate: new Date(),
      isCompleted: true
    }).where('id', boardId)
  }
}

const boardRepositoryInstance = new BoardRepository()
export {boardRepositoryInstance as BoardRepository}
