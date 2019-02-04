import { IsDefined, IsBoolean, IsNumber } from 'class-validator'
import { validateWithThrow } from './Validation'
import { Board } from './Board'
import { ArgumentError } from './Error'
import { BoardMatrixService } from '../services/BoardService/BoardMatrixService'

export interface ICellEntity {
  id: number
  boardId: number
  xCoord: number
  yCoord: number
  sectionIndex: number
  value: number | null
  isDefault: boolean
}

export class CreateCellEntity {
  @IsDefined()
  @IsNumber()
  boardId: number

  @IsDefined()
  @IsNumber()
  xCoord: number

  @IsDefined()
  @IsNumber()
  yCoord: number

  @IsDefined()
  @IsNumber()
  sectionIndex: number

  @IsNumber()
  value: number | null

  @IsDefined()
  @IsBoolean()
  isDefault: boolean

  constructor(boardId: number, xCoord: number, yCoord: number, value: number) {
    this.boardId = boardId
    this.xCoord = xCoord
    this.yCoord = yCoord
    this.sectionIndex = BoardMatrixService.getSectionIndex(xCoord, yCoord)
    this.value = value
    this.isDefault = !!value

    validateWithThrow(this)
  }
}

export class Cell {
  @IsDefined()
  @IsNumber()
  id: number

  @IsDefined()
  @IsNumber()
  row: number

  @IsDefined()
  @IsNumber()
  column: number

  @IsDefined()
  @IsNumber()
  sectionIndex: number

  @IsNumber()
  value: number | null

  @IsDefined()
  @IsBoolean()
  isDefault: boolean

  constructor(json: ICellEntity) {
    this.id = json.id
    this.row = json.xCoord
    this.column = json.yCoord
    this.sectionIndex = json.sectionIndex
    this.value = json.value
    this.isDefault = json.isDefault

    validateWithThrow(this)
  }
}

export class UpdateCellRequest {
  @IsNumber()
  value: number | null

  constructor(board: Board, json: any) {
    this.value = json.value

    validateWithThrow(this)
    this.customValidation(board.size)
  }

  customValidation(boardSize: number) {
    if (this.value > boardSize) {
      throw new ArgumentError('value', `Value of each cell cannot exceed ${boardSize}`)
    }
  }
}
