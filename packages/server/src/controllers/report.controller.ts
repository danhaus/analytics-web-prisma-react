import { Request, Response } from 'express';
import { calculateAverageFileSize, countFilesGroupByType, countFilesGroupByUser } from '../services';

export const getNumberOfFilesGroupByUser = async (req: Request, res: Response): Promise<void> => {
  const result = await countFilesGroupByUser();
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
