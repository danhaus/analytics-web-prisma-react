import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../../client';

export const validateCreate = [body('name').exists().isString()];

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { name } = req.body;
  const result = await prisma.user.create({
    data: {
      name,
    },
  });
  res.json(result);
};
