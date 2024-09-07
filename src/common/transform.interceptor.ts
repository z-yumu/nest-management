import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { IResponse } from './interface/response'

// Request successful unified return format
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: 'success',
        }
      }),
    )
  }
}
