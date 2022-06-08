import { ExceptionFilter, Catch } from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import { HttpException } from '@nestjs/common';

@Catch(Error)
export class RegisterExceptionFilter implements ExceptionFilter {
    catch(exception: Error) {
        let message;

        if (exception instanceof PrismaClientValidationError) {
            message = 'Validation error, missing some fields';
        }
        if (exception instanceof PrismaClientKnownRequestError) {
            message = 'This email already exists';
        }

        throw new HttpException(message || exception.message, 400);
    }
}
