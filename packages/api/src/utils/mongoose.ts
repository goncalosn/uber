import mongoose from 'mongoose';
import logger from './logger';
import { MONGODB_CONNECTION_STRING } from './constants';

export async function connectToMongoDatabase() {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);

    logger.info('Connected to mongo database!');
  } catch (e) {
    logger.error(e, 'Failed to connect to mongo database');
    process.exit(1);
  }
}
