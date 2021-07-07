import { FileType } from '@prisma/client';
import { seed } from '../../prisma/seed';
import prisma from '../../client';
import { calculateAverageFileSize, countFilesGroupByType, countFilesUploadedBy } from '../services';

describe('reporting functionality', () => {
  beforeAll(async () => {
    await seed();
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    const deleteFiles = prisma.file.deleteMany();

    await prisma.$transaction([deleteUsers, deleteFiles]);

    await prisma.$disconnect();
  });

  test('Josh (id: 1) has uploaded two files', async () => {
    const joshesFileCount = await countFilesUploadedBy(1);
    expect(joshesFileCount).toEqual(2);
  });

  test('There are two MP4 files and one WAV file.', async () => {
    const fileCountByType = await countFilesGroupByType();
    expect(fileCountByType).toEqual(
      expect.arrayContaining([
        { type: FileType.MP4.toString(), fileCount: 2 },
        { type: FileType.WAV.toString(), fileCount: 1 },
      ]),
    );
  });

  it('calculates average file size of all files', async () => {
    const avgFileSize = await calculateAverageFileSize();
    expect(avgFileSize).toEqual(4650);
  });
});
