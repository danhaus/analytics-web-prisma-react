import { Router } from 'express';
import * as users from '../controllers/user.controller';

const router = Router();

// Create new user
router.post('/', users.validateCreate, users.create);

// Get all users
router.get('/', users.getAllUsers);

export default router;
