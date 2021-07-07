import { Router } from 'express';
import * as reports from '../controllers/report.controller';

const router = Router();

// Get number of files grouped by user
router.get('/numberOfFilesByUser', reports.getNumberOfFilesGroupByUser);

// Get number of files grouped by file type
router.get('/numberOfFilesByType', reports.getNumberOfFilesGroupByType);

// Get average file size of all files
router.get('/averageFileSize', reports.getAverageFileSize);

export default router;
