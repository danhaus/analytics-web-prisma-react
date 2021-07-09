import { FileType, File } from '@prisma/client';
import prisma from '../../client';

// Returns the number of files uploaded by user
export const countFiles = async (userId?: number): Promise<number> =>
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

// Returns the size of files per type of file
export const retrieveFileSizeGroupByType = async (): Promise<{ type: FileType; totalSize: number }[]> => {
  const result = await prisma.file.groupBy({
    by: ['type'],
    _sum: {
      size: true,
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return result.map((o) => ({ type: o.type, totalSize: o._sum.size ? o._sum.size : 0 }));
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
