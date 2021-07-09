import { FileType, File } from '@prisma/client';
import prisma from '../../client';

// Returns the number of files uploaded by user
export const countFiles = async (userId?: number): Promise<number> =>
  prisma.file.count({
    where: {
      userId,
    },
  });

// Returns files stats grouped by file type
export const retrieveFileStatsByFileType = async (): Promise<
  { type: FileType; size: number; count: number; duration: number }[]
> => {
  const result = await prisma.file.groupBy({
    by: ['type'],
    _count: true,
    _sum: {
      size: true,
      duration: true,
    },
  });
  /* eslint-disable no-underscore-dangle */
  return result.map((o) => ({
    type: o.type,
    size: o._sum.size ? o._sum.size : 0,
    count: o._count,
    duration: o._sum.duration ? o._sum.duration : 0,
  }));
  /* eslint-enable no-underscore-dangle */
};

// Returns average file size of all files or per user
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

// Returns average duration of all files or per user
export const calculateAverageVideoDuration = async (userId?: number): Promise<number> => {
  const result = await prisma.file.aggregate({
    _avg: {
      duration: true,
    },
    where: {
      userId,
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return result._avg.duration ? result._avg.duration : 0;
};

export const retrieveAllFiles = async (): Promise<File[]> => prisma.file.findMany();
