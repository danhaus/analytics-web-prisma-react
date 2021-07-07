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
