import { IsDefined, IsEnum, IsNumber, IsBoolean, ValidateNested } from 'class-validator'
import { validateWithThrow } from './Validation'
import { ArgumentError } from './Error'
import { ICellEntity, Cell } from './Cell'


/**
 * A list of board difficulties
 */
export enum BoardDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

/**
 * Enum BoardDifficulty in an array during run-time
 */
const boardDifficultyInArray = Object.values(BoardDifficulty)

export enum BoardDifficultyToNumberOfDefaultCellsMapping {
  EASY = 36,
  MEDIUM = 29,
  HARD = 25
}

const DEFAULT_BOARD_SIZE = 9
export const DEFAULT_BOARD_SECTION_SIZE = 3

/**
 * Sanitize POST /board req.body
 */
export class CreateBoardRequest {
  @IsDefined()
  @IsNumber()
  size: number

  @IsDefined()
  @IsEnum(BoardDifficulty)
  difficulty: BoardDifficulty

  constructor(json: any) {
    this.size = DEFAULT_BOARD_SIZE
    this.difficulty = json.difficulty

    validateWithThrow(this)
  }
}

/**
 * Board Entity interface
 */
export interface IBoardEntity {
  id: number
  size: number
  difficulty: BoardDifficulty
  createDate: Date
  isCompleted: boolean
  completeDate: Date
}


/**
 * Board business object
 */
export class Board {
  @IsDefined()
  @IsNumber()
  id: number

  @IsDefined()
  @IsNumber()
  size: number

  @IsDefined()
  @IsBoolean()
  isCompleted: boolean

  @IsDefined()
  @ValidateNested()
  cells: Cell[]

  constructor(board: IBoardEntity, cells: ICellEntity[]) {
    this.id = board.id
    this.size = board.size
    this.isCompleted = board.isCompleted
    this.cells = cells.map((cell) => new Cell(cell))
  }
}
