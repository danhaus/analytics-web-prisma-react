import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import {
  calculateAverageFileSize,
  calculateAverageVideoDuration,
  countFilesGroupByType,
  countFiles,
  retrieveFileSizeGroupByType,
} from '../services';

export const validateGetNumberOfFilesForUser = [param('userId').exists().isInt()];

export const getTotalNumberOfFiles = async (req: Request, res: Response): Promise<void> => {
  const totalNumberOfFiles = await countFiles();
  res.json(totalNumberOfFiles);
};

export const getNumberOfFilesForUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const userId = parseInt(req.params.userId, 10);
  const result = await countFiles(userId);
  res.json(result);
};

export const getNumberOfFilesGroupByType = async (req: Request, res: Response): Promise<void> => {
  const result = await countFilesGroupByType();
  res.json(result);
};

export const getFileSizeGroupByType = async (req: Request, res: Response): Promise<void> => {
  const result = await retrieveFileSizeGroupByType();
  res.json(result);
};

export const getAverageFileSize = async (req: Request, res: Response): Promise<void> => {
  const result = await calculateAverageFileSize();
  res.json(result);
};

export const validateGetAverageFileSizeForUser = [param('userId').exists().isString()];

export const getAverageFileSizeForUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const userId = parseInt(req.params.userId, 10);
  const result = await calculateAverageFileSize(userId);
  res.json(result);
};

export const getAverageVideoDuration = async (req: Request, res: Response): Promise<void> => {
  const result = await calculateAverageVideoDuration();
  res.json(result);
};

export const validateGetAverageVideoDurationForUser = [param('userId').exists().isString()];

export const getAverageVideoDurationForUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const userId = parseInt(req.params.userId, 10);
  const result = await calculateAverageVideoDuration(userId);
  res.json(result);
};
