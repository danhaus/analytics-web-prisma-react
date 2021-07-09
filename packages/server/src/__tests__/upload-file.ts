import prisma from '../../client';
import { createFile, retrieveAllFiles } from '../services';
import { seed } from '../../prisma/seed';

describe('create user and upload files', () => {
  beforeAll(async () => {
    await seed();
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    const deleteFiles = prisma.file.deleteMany();

    await prisma.$transaction([deleteUsers, deleteFiles]);

    await prisma.$disconnect();
  });

  it('creates new file uploaded by Josh', async () => {
    // Get Josh's id
    const josh = await prisma.user.findFirst({
      where: { name: 'Josh' },
    });

    const file = await createFile({
      name: 'file1',
      type: 'WAV',
      duration: 97,
      size: 12345,
      userId: josh!.id,
    });

    expect(file.user.name).toEqual('Josh');
  });

  it('retrieves all files', async () => {
    const allFiles = await retrieveAllFiles();
    expect(allFiles).toHaveLength(4);
  });
});
