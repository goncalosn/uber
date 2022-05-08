import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { registerUserSchema } from '@uber/interfaces';

import { registerUserHandler } from './user.controller';
import requireUser from '../../middleware/requireUser';

const router = Router();

router.post('/', processRequestBody(registerUserSchema), registerUserHandler);
router.get('/me', requireUser, (req, res) => res.send(res.locals.user));

export default router;
