import { loginSchema } from '@uber/interfaces';
import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { loginHandler } from './session.controller';

const router = Router();

router.post('/login', processRequestBody(loginSchema), loginHandler);

export default router;
