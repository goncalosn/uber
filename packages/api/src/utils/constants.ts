export const LOCAL_DEV = process.env.LOCAL_DEV || true;
export const DOMAIN = process.env.DOMAIN || 'localhost';
export const PORT = process.env.PORT || 8080;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
export const MONGODB_CONNECTION_STRING =
  process.env.MONGODB_CONNECTION_STRING ||
  'mongodb://root:dummy123@localhost:27017/uber?authSource=admin';
export const SALT_ROUNDS = 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';
