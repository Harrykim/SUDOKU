/**
 * Type of board matrix
 * i.e.) [[null,0,0], [0,null,0], [0,0,null]]
 */
export type BoardMatrix = Array<CellInBoardMatrix[]>

/**
 * Type of each sell in board matrix
 */
export type CellInBoardMatrix = number | null

/**
 * Board validation
 *  - each array represents a list of indexes that are invalid
 */
export interface IBoardMatrixValidation {
  rows: number[],
  columns: number[],
  sections: number[]
}
