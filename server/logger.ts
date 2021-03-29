import winston from 'winston';

let transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.simple()
    ),
  }),
];

if (process.env.NODE_ENV === 'production') {
  transports = [new winston.transports.Console()];
}

export const logger = winston.createLogger({
  level: 'info',
  transports,
});

if (process.env.NODE_ENV === 'test') {
  logger.pause();
}

export function makeLogger(name: string) {
  return logger.child({ module: name });
}
