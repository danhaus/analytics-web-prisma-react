import { Request, Response } from 'express';
import { countFilesGroupByUser } from '../services';

export const getNumberOfFilesGroupedByUser = async (req: Request, res: Response): Promise<void> => {
  const result = await countFilesGroupByUser();
  res.json(result);
};
