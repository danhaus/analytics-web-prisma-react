import { Router } from 'express';
import * as reports from '../controllers/report.controller';

const router = Router();

// Get total number of files
router.get('/fileCount', reports.getTotalNumberOfFiles);

// Get number of files for a user
router.get('/fileCount/:userId(\\d+)', reports.validateGetNumberOfFilesForUser, reports.getNumberOfFilesForUser);

// Get file stats grouped by type
router.get('/fileStats', reports.getFileStatsGroupByType);

// Get average file size of all files
router.get('/averageFileSize', reports.getAverageFileSize);

// Get average file size for a user
router.get('/averageFileSize/:userId', reports.validateGetAverageFileSizeForUser, reports.getAverageFileSizeForUser);

// Get average video duration of all files
router.get('/averageVideoDuration', reports.getAverageVideoDuration);

// Get average video duration for a user
router.get(
  '/averageVideoDuration/:userId',
  reports.validateGetAverageVideoDurationForUser,
  reports.getAverageVideoDurationForUser,
);

export default router;
