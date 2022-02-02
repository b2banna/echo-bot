import winston from "winston";
import winstonDailyRotateFile from "winston-daily-rotate-file";

const { colorize, combine, printf, splat, timestamp } = winston.format;

const myFormat = printf(({ timestamp, level, message, meta, stack }) => {
  return `\nLEVEL: ${level}\t| TIMESTAMP: ${timestamp}\t| MESSAGE: ${message} ${meta ? `\t| META: ${JSON.stringify(meta)}` : ""
    } ${stack ? `\t| STACK: ${stack}` : ""} \n`;
});

const customFormatter = combine(colorize(), timestamp(), splat(), myFormat);
const winstonDailyRotateFileTransportError = new winstonDailyRotateFile({ filename: "./logs/%DATE%.log", datePattern: "YYYY-MM-DD", level: "info" });
const winstonConsoleTransport = new winston.transports.Console({ level: "info" });
const transports = [winstonDailyRotateFileTransportError, winstonConsoleTransport];
const options = { level: "debug", transports, format: customFormatter };

export const Logger = winston.createLogger(options);
