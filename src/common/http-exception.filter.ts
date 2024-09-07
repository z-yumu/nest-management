import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common'
import { ApiException } from './exceptions/api.exception'
import { ResOp } from './class/res.class'
// import { isDev } from 'src/config/env'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() 
    const response = ctx.getResponse() 
    const status = exception.getStatus() 
    const request = ctx.getRequest()
    // set error info
    let message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`

    // 500 type error prompt in development mode, block 500 internal error prompt in production mode
    // if (isDev() || status < 500) {
    //   message =
    //     exception instanceof HttpException ? exception.message : `${exception}`
    // }

    // record logs
    if (status >= 500) {
      console.error(exception)
    }

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrorCode()
        : status

    // console.log(code,'code')
    const result = new ResOp(
      null,
      code,
      message,
      new Date().getTime(),
      request.url,
    )

    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(result)
  }
}
