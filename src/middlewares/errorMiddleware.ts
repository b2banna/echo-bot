import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import CONSTANTS from '../constants';
import { ExpressError } from "../interfaces/IError";
import { ExpressResponse } from "../interfaces/IExpress";

export class ErrorMiddleware {
  static handleError(error: ExpressError, _req: Request, res: Response, _next: NextFunction): Response<ExpressResponse> {
    console.error(error.stack)
    const response: ExpressResponse = { ...CONSTANTS.RESPONSE };
    response.status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    response.message = error.message || HttpStatus.getStatusText(response.status);
    return res.status(response.status).send(response);
  }
}
