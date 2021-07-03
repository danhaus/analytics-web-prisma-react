import { Router } from 'express';
import * as users from '../controllers/user.controller';

const router = Router();

// Create new user
router.post('/', users.create);

export default router;
