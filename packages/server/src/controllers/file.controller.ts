import { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../../client';
import { isValidFileType } from './custom-validators';

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

  const result = await prisma.file.create({
    data: {
      name,
      type,
      duration,
      size,
      userId,
    },
  });
  res.json(result);
};
