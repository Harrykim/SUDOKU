import { ValidationError, validateSync } from 'class-validator'
import { ArgumentError } from './Error'

export function validateWithThrow(object: any): void {
  const validations = validateSync(object, {skipMissingProperties: true})
  const errorMessage = getErrorMessageFromValidation(validations)
  if (errorMessage) {
    throw new ArgumentError('validation', errorMessage)
  } else {
    return
  }
}

export function getErrorMessageFromValidation(validations: ValidationError[]): string | null {

  for (const validation of validations) {
    const errorMessage = validateSingularError(validation)
    if (errorMessage) {
      return errorMessage
    }
  }

  return null
}

function validateSingularError(validation: ValidationError): string | null {
  const constraints = validation.constraints
  for (const key in constraints) {
    if (constraints[key]) {
      return constraints[key]
    }
  }
  for (const child of validation.children) {
    const errorMessage = validateSingularError(child)
    if (errorMessage) {
      return errorMessage
    }
  }
  return null
}
