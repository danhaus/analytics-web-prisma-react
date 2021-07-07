import { Router } from 'express';
import * as reports from '../controllers/reporting.controller';

const router = Router();

// Get number of files grouped by user
router.get('/numberOfFiles', reports.getNumberOfFilesGroupedByUser);

export default router;
