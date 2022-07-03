import mongoose from 'mongoose';
import logger from './logger';
import { MONGODB_CONNECTION_STRING } from './constants';

export const connectToMongoDatabase = async (uri?: string) => {
  try {
    await mongoose.connect(uri || MONGODB_CONNECTION_STRING, {
      maxPoolSize: 50,
    });

    logger.info('Connected to mongo database!');
  } catch (e) {
    logger.error(e, 'Failed to connect to mongo database');
    process.exit(1);
  }
};
