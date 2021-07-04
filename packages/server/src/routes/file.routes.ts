import { Router } from 'express';
import * as files from '../controllers/file.controller';

const router = Router();

// Create new file and associate it with an existing user
router.post('/', files.validateCreate, files.create);

export default router;
