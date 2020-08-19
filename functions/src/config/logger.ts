import { createLogger, format, transports, addColors } from 'winston';

const { combine, label, timestamp, colorize } = format;

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

const loggerFormat = format.printf(
  info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`,
);

export const logger = createLogger({
  exceptionHandlers: [new transports.Console()],
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: 'main' }),
        format(info => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        timestamp(),
        colorize(),
        loggerFormat,
      ),
    }),
  ],
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};
