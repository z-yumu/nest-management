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
    const ctx = host.switchToHttp() // 获取http请求上下文
    const response = ctx.getResponse() // 获取response对象
    const status = exception.getStatus() // 获取异常状态码
    const request = ctx.getRequest()
    // 设置错误信息
    let message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`

    // 开发模式下提示500类型错误，生产模式下屏蔽500内部错误提示
    // if (isDev() || status < 500) {
    //   message =
    //     exception instanceof HttpException ? exception.message : `${exception}`
    // }

    // 记录 500 日志
    if (status >= 500) {
      console.error(exception)
    }

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrorCode()
        : status

    console.log(code,'code')
    const result = new ResOp(
      null,
      code,
      message,
      new Date().getTime(),
      request.url,
    )

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(result)
  }
}
