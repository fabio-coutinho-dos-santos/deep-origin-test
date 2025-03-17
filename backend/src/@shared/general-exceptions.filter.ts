import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(exception, GeneralExceptionsFilter.name);

    if (this.knownException(exception)) {
      const errorMessage = exception.response.message || exception.message;
      response.status(exception.status).json({
        statusCode: exception.status,
        message: errorMessage,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  private knownException(exception: unknown): boolean {
    return (
      exception instanceof ForbiddenException ||
      exception instanceof BadRequestException ||
      exception instanceof UnauthorizedException ||
      exception instanceof NotFoundException ||
      exception instanceof UnprocessableEntityException
    );
  }
}
