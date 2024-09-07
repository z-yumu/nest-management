import { HttpException } from '@nestjs/common'
import { ErrorCodeMap } from '../contants/error-code.contants'

/**
 * API business exceptions all throw this exception
 */
export class ApiException extends HttpException {
  /**
   * Business type error code, not HTTP code
   */
  private errorCode: number

  constructor(errorCode: number) {
    super({
      code: errorCode,
      message:ErrorCodeMap[errorCode]
    }, 200)
    this.errorCode = errorCode
  }

  getErrorCode(): number {
    return this.errorCode
  }
}
