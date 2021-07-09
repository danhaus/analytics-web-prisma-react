import { FileType } from '@prisma/client';
import { seed } from '../../prisma/seed';
import prisma from '../../client';
import {
  calculateAverageFileSize,
  calculateAverageVideoDuration,
  countFiles,
  retrieveFileStatsByFileType,
} from '../services';

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
    const joshesFileCount = await countFiles(1);
    expect(joshesFileCount).toEqual(2);
  });

  it('counts all files', async () => {
    const totalFileCount = await countFiles();
    expect(totalFileCount).toEqual(3);
  });

  it('calculates files stats and groups them by file type', async () => {
    const fileStatsByType = await retrieveFileStatsByFileType();
    expect(fileStatsByType).toEqual(
      expect.arrayContaining([
        {
          type: FileType.MP4.toString(),
          count: 2,
          size: 9592,
          duration: 259,
        },
        {
          type: FileType.WAV.toString(),
          count: 1,
          size: 4358,
          duration: 1263,
        },
      ]),
    );
  });

  describe('average file size', () => {
    it('calculates average file size of all files', async () => {
      const avgFileSize = await calculateAverageFileSize();
      expect(avgFileSize).toEqual(4650);
    });

    it('calculates average file size of Josh', async () => {
      const joshesAvgFileSize = await calculateAverageFileSize(1);
      expect(joshesAvgFileSize).toEqual((689 + 4358) / 2);
    });
  });

  describe('average video duration', () => {
    it('calculates average video duration of all files', async () => {
      const avgVideoDuration = await calculateAverageVideoDuration();
      expect(avgVideoDuration).toEqual((25 + 1263 + 234) / 3);
    });

    it('calculates average video duration for Josh', async () => {
      const joshesAvgVideoDuration = await calculateAverageVideoDuration(1);
      expect(joshesAvgVideoDuration).toEqual((25 + 1263) / 2);
    });
  });
});
