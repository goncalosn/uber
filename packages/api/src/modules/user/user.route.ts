import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { registerUserSchema } from '@uber/interfaces';

import { registerUserHandler } from './user.controller';

const route = Router();

route.post('/', processRequestBody(registerUserSchema), registerUserHandler);

export default route;
