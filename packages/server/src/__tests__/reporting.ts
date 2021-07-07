import { FileType } from '@prisma/client';
import { seed } from '../../prisma/seed';
import prisma from '../../client';
import { countFilesGroupByType, countFilesGroupByUser } from '../services';

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

  test('Josh (id: 1) has uploaded two files, while Alice (id: 2) only one', async () => {
    const fileCountByUser = await countFilesGroupByUser();
    expect(fileCountByUser).toEqual(
      expect.arrayContaining([
        { id: 1, fileCount: 2 },
        { id: 2, fileCount: 1 },
      ]),
    );
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
});
