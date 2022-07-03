import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import logger from '../../utils/logger';
import { createUser } from './user.service';
import { RegisterUserBody } from './user.schema';

const registerUserHandler = async (
  req: Request<object, object, RegisterUserBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });

    return res.status(StatusCodes.CREATED).send('User created successfully');
  } catch (e) {
    if (e.code === 11000) {
      logger.error(e);
      return res.status(StatusCodes.CONFLICT).send('User already exists');
    }

    logger.error(e);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export { registerUserHandler };
