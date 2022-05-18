import cookieParser = require('cookie-parser');
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import logger from './utils/logger';
import { PORT, CORS_ORIGIN } from './utils/constants';
import userRoute from './modules/user/user.route';
import authRoute from './modules/session/session.route';
import { connectToMongoDatabase } from './utils/mongoose';
import deserializeUser from './middleware/deserializeUser';

const app = express();

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
app.use('/api/auth', authRoute);

const server = app.listen(PORT, async () => {
  await connectToMongoDatabase();
  logger.info(`Listening at http://localhost:${PORT}`);
});
server.on('error', logger.error);
