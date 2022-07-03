import cookieParser = require('cookie-parser');
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import logger from './utils/logger';
import { PORT, CORS_ORIGIN } from './utils/constants';
import userRoute from './modules/user/user.route';
import sessionRoute from './modules/session/session.route';
import { connectToMongoDatabase } from './utils/mongo';
import deserializeUser from './middleware/deserializeUser';

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', sessionRoute);

const server = app.listen(PORT, async () => {
  await connectToMongoDatabase();
  logger.info(`Listening at http://localhost:${PORT}`);
});
server.on('error', logger.error);
