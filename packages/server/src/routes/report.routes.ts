import { Router } from 'express';
import * as reports from '../controllers/report.controller';

const router = Router();

// Get number of files grouped by user
router.get('/fileCount/:userId(\\d+)', reports.getNumberOfFilesGroupByUser);

// Get number of files grouped by file type
router.get('/fileCount/byType', reports.getNumberOfFilesGroupByType);

// Get average file size of all files
router.get('/averageFileSize', reports.getAverageFileSize);

export default router;
