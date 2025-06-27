import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;
    const now = Date.now();

    console.log(`[${method}] ${originalUrl} - Request received`);

    return next.handle().pipe(
      tap((data) => {
        console.log(
          `[${method}] ${originalUrl} - Done in ${Date.now() - now}ms`,
        );
        console.log(`Response:`, JSON.stringify(data));
      }),
    );
  }
}
