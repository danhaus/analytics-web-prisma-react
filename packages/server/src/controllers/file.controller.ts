import { Response, Request } from 'express';
import prisma from '../../client';

export const create = async (req: Request, res: Response): Promise<void> => {
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
