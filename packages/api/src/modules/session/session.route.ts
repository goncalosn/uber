import { loginSchema } from '@uber/interfaces';
import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';

import { deleteSessionHandler, loginHandler } from './session.controller';
import requireUser from '../../middleware/requireUser';

const router = Router();

router.post('/login', processRequestBody(loginSchema), loginHandler);
router.post('/logout', requireUser, deleteSessionHandler);
router.get('/me', requireUser, (req, res) => res.send(res.locals.user));

export default router;
