import { expect, assert } from 'chai'
import { BoardMatrixService } from '../../src/services/BoardService/BoardMatrixService'
import { CellInBoardMatrix, BoardMatrix } from '../../src/models/BoardMatrix'

describe('Tests', () => {

  // 1. Test BoardMatrixService.canComplete

  it('Can solve Sudoku problem', async () => {
    const emptySudoku: CellInBoardMatrix[][] = [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]
    const solvedBoard = BoardMatrixService.solveBoard(emptySudoku) as BoardMatrix
    assert.equal(solvedBoard.length, 9)
    solvedBoard.forEach((row) => {
      assert.equal(row.length, 9)
    })
    assert.equal(true, BoardMatrixService.canComplete(solvedBoard))
  })

  // 2. Test BoardMatrixService.isSafeToFill

  // 3. Update Cell value cannot exceed board size
})




