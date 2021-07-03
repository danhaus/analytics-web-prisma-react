import { Request, Response } from 'express';
import prisma from '../../client';

export const create = async (req: Request, res: Response): Promise<void> => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Name can not be empty!',
    });
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
