export class ResOp {
  readonly data: any
  readonly code: number
  readonly message: string
  readonly timestamp: number
  readonly path: string

  constructor(
    data: any,
    code: number,
    message: string,
    timestamp?: number,
    path?: string,
  ) {
    this.data = data
    this.code = code
    this.message = message
    this.timestamp = timestamp || Date.now()
    this.path = path
  }
}
