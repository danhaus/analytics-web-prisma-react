import { Router } from 'express';
import * as reports from '../controllers/report.controller';

const router = Router();

// Get number of files grouped by user
router.get('/numberOfFilesByUser', reports.getNumberOfFilesGroupedByUser);

// Get number of files grouped by file type
router.get('/numberOfFilesByType', reports.getNumberOfFilesGroupByType);

export default router;
