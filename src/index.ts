require('dotenv').config();

import cors from 'cors';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import path from 'path';
import favicon from 'serve-favicon';

import CONSTANTS from './constants';
import { ErrorMiddleware } from './middlewares/errorMiddleware';
import { LogMiddleware } from "./middlewares/logMiddleware";
import { routers } from './routers';

const port = process.env.PORT || process.env.port || "3000";
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(LogMiddleware.logging);

// Set up APIs route
app.use(CONSTANTS.ROUTER_PATH.API_BASE_PATH, routers);

// Set up Index route
app.get(CONSTANTS.ROUTER_PATH.INDEX, (_req: Request, res: Response, _next: NextFunction) => res.send("Hello World!"));

// Catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)));

// Error handler
app.use(ErrorMiddleware.handleError);

// Start server
app.listen(port, async () => {
  console.log(`\nServer listening on port: ${port}`);
});
