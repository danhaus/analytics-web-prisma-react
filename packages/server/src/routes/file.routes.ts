import { Router } from 'express';
import * as files from '../controllers/file.controller';

const router = Router();

// Create new file and associate it with an existing user
router.post('/', files.validateCreate, files.create);

// Get all files
router.get('/', files.getAllFiles);

export default router;
