import { FileType } from '@prisma/client';
import prisma from '../../client';

// Returns the number of files uploaded by user
export const countFilesUploadedBy = async (userId: number): Promise<number> =>
  prisma.file.count({
    where: {
      userId,
    },
  });

// Returns the number of files per type of file
export const countFilesGroupByType = async (): Promise<{ type: FileType; fileCount: number }[]> => {
  const result = await prisma.file.groupBy({
    by: ['type'],
    _count: true,
  });
  // eslint-disable-next-line no-underscore-dangle
  return result.map((o) => ({ type: o.type, fileCount: o._count ? o._count : 0 }));
};

// Returns average file size of all files
export const calculateAverageFileSize = async (userId?: number): Promise<number> => {
  const result = await prisma.file.aggregate({
    _avg: {
      size: true,
    },
    where: {
      userId,
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return result._avg.size ? result._avg.size : 0;
};
