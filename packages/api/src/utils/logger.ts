import pino from 'pino';
import _ from 'pino-pretty';

const logger = pino({
  transport: { target: 'pino-pretty' },
  options: {
    colorize: true,
  },
});

export default logger;
