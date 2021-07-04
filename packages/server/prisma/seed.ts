import { FileType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase(): Promise<void> {
  // Prisma create query to seed models in database

  // Users
  const josh = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Josh',
      countryOfOrigin: 'AU',
    },
  });

  const alice = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Alice',
      countryOfOrigin: 'US',
    },
  });

  console.log({ josh, alice });

  // Files

  const deleteFiles = prisma.file.deleteMany();
  await prisma.$transaction([deleteFiles]);

  const file1 = await prisma.file.create({
    data: {
      name: 'file1',
      type: FileType.MP4,
      duration: 25,
      size: 689,
      userId: josh.id,
    },
  });

  const file2 = await prisma.file.create({
    data: {
      name: 'file2',
      type: FileType.WAV,
      duration: 1263,
      size: 4358,
      userId: josh.id,
    },
  });

  const file3 = await prisma.file.create({
    data: {
      name: 'file3',
      type: FileType.MP4,
      duration: 234,
      size: 8903,
      userId: alice.id,
    },
  });

  console.log({ file1, file2, file3 });
}

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
