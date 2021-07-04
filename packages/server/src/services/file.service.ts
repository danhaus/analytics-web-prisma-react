import { FileType } from '@prisma/client';
import prisma from '../../client';

export interface CreateFile {
  name: string;
  type: FileType;
  duration: number; // int
  size: number; // int
  userId: number; // int
}

export const createFile = async ({ name, type, duration, size, userId }: CreateFile) => {
  return prisma.file.create({
    data: {
      name,
      type,
      duration,
      size,
      userId,
    },
    include: {
      user: true,
    },
  });
};
