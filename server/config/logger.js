import { createLogger, format as _format, transports as _transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = createLogger({
  level: 'info',
  format: _format.combine(
    _format.timestamp(),
    _format.errors({ stack: true }),
    _format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new _transports.Console({
    format: _format.simple()
  }));
}

export default logger;