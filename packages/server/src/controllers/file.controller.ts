import { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidFileType } from './custom-validators';
import { createFile, retrieveAllFiles } from '../services';

export const validateCreate = [
  body('name').exists().isString(),
  body('type').exists().custom(isValidFileType),
  body('duration').exists().isInt(),
  body('size').exists().isInt(),
  body('userId').exists().isInt(),
];

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { name, type, duration, size, userId } = req.body;

  const result = await createFile({ name, type, duration, size, userId });
  res.json(result);
};

export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
  const allFiles = await retrieveAllFiles();
  res.json(allFiles);
};
