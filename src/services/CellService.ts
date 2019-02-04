import { Cell, UpdateCellRequest } from '../models/Cell'
import { BoardDifficulty } from '../models/Board'
import { CellRepository } from '../repositories/CellRepository'

class CellService {

  async createByBoardId(boardId: number, boardSize: number, difficulty: BoardDifficulty): Promise<void> {
    return await CellRepository.createByBoardId(boardId, boardSize, difficulty)
  }

  /**
   * @param boardId board id to reset
   * @returns void
   */
  async resetByBoardId(boardId: number): Promise<void> {
    return await CellRepository.resetByBoardId(boardId)
  }

  /**
   * @param boardId board id to get cells
   * @returns cells that belong to boardId
   */
  async getByBoardId(boardId: number): Promise<Cell[]> {
    const cellEntities = await CellRepository.getByBoardId(boardId)
    const cells = cellEntities.map((cellEntry) => new Cell(cellEntry))
    return cells
  }

  /**
   * @param boardId boardId that has cell id
   * @param cellId cell id to update
   * @returns updated cell
   */
  async update(boardId: number, cellId: number, update: UpdateCellRequest): Promise<Cell> {
    const cellEntity = await CellRepository.update(boardId, cellId, update)
    return new Cell(cellEntity)
  }
}

const cellServiceInstance = new CellService()
export {cellServiceInstance as CellService}
