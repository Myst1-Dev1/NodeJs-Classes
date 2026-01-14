/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { RpcErrorPayload } from './rpc.types';

// this filter run inside microservice process
// our payload structure should follow the way that we want
Catch();
export class RpcAllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    }

    const status = exception?.getStatus?.();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (status === 400) {
      const payload: RpcErrorPayload = {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: response,
      };

      return super.catch(new RpcException(payload), host);
    }

    const payload: RpcErrorPayload = {
      code: 'INTERNAL',
      message: 'Internal error',
    };

    return super.catch(new RpcException(payload), host);
  }
}
