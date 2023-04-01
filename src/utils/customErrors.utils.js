export const ErrorsCodes = {
  ROUTING_ERROR:1,
  INVALID_TYPES_ERROR:2,
  BAD_OR_MISSING_ID:3,
  BAD_OR_MISSING_EMAIL:4
}

export class CustomError {

  static createError(name, cause, message, code) {
    const error = new Error(message, {cause})
    error.name = name
    error.code = code
    throw error
  }

}
