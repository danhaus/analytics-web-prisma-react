import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { calculateAverageFileSize, countFilesGroupByType, countFilesUploadedBy } from '../services';

export const validateGetNumberOfFilesGroupByUser = [param('userId').exists().isInt()];

export const getNumberOfFilesGroupByUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const userId = parseInt(req.params.userId, 10);
  const result = await countFilesUploadedBy(userId);
  res.json(result);
};

export const getNumberOfFilesGroupByType = async (req: Request, res: Response): Promise<void> => {
  const result = await countFilesGroupByType();
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
