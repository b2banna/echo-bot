import { Request, Response, NextFunction } from "express";
import { v1 as uuidV1 } from 'uuid';

import { RequestDTO } from "../dtos/apiLog";
import { Logger } from "../helpers/customLoggerHelper";

export class LogMiddleware {
  static logging(req: Request, _res: Response, next: NextFunction): void {
    const requestId = uuidV1();
    const requestReceivedTimeInMilliseconds = Date.now();
    const requestDto = new RequestDTO(req);
    Logger.info(`API requestId ${requestId} start and request payload is: ${JSON.stringify(requestDto)}`);
    next();
    const responseReturnTimeInMilliseconds = Date.now();
    const responseTimeInMilliseconds = responseReturnTimeInMilliseconds - requestReceivedTimeInMilliseconds;
    Logger.info(`API requestId ${requestId} end and response time is: ${responseTimeInMilliseconds}ms`);
  };
}
