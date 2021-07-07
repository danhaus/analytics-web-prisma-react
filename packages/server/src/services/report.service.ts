import { FileType } from '@prisma/client';
import prisma from '../../client';

// Returns the number of files uploaded per user
export const countFilesGroupByUser = async (): Promise<{ id: number; fileCount: number }[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      _count: {
        select: {
          files: true,
        },
      },
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return result.map((o) => ({ id: o.id, fileCount: o._count ? o._count.files : 0 }));
};

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
export const calculateAverageFileSize = async (): Promise<number> => {
  const result = await prisma.file.aggregate({
    _avg: {
      size: true,
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return result._avg.size ? result._avg.size : 0;
};
