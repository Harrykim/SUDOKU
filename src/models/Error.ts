
export class NotFoundError extends Error {
  statusCode: number
  parameter: string
  message: string

  constructor(parameter: string, message?: string) {
    super()
    this.statusCode = 404
    this.parameter = parameter
    this.message = message || ''
  }
}

export class ArgumentError extends Error {
  statusCode: number
  parameter: string
  message: string

  constructor(parameter: string, message: string) {
    super()
    this.statusCode = 400
    this.parameter = parameter
    this.message = message
  }
}

export class CompleteBoardError extends Error {
  statusCode: number
  message: string

  constructor(message: string) {
    super()
    this.statusCode = 409
    this.message = message
  }
}
