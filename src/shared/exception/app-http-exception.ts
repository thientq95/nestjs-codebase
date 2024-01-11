import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class AppHttpException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: HttpExceptionOptions,
  ) {
    super(
      objectOrError,
      HttpStatus.INTERNAL_SERVER_ERROR,
      descriptionOrOptions,
    );
  }
}
