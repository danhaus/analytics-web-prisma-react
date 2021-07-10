import { FileType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function testingSeed(): Promise<void> {
  console.log('##### SEEDING DATABASE #####');

  // Prisma create query to testingSeed models in database

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const file1 = await prisma.file.create({
    data: {
      name: 'file1',
      type: FileType.MP4,
      duration: 25,
      size: 689,
      userId: josh.id,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const file2 = await prisma.file.create({
    data: {
      name: 'personal_blog_intro',
      type: FileType.WAV,
      duration: 1263,
      size: 4358,
      userId: josh.id,
    },
  });

  const file3 = await prisma.file.create({
    data: {
      name: 'interview with elon',
      type: FileType.MP4,
      duration: 234,
      size: 8903,
      userId: alice.id,
    },
  });

  console.log({ file1, file2, file3 });
}

export async function seed(): Promise<void> {
  await testingSeed();

  // Users

  const katrine = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Kathrine',
      countryOfOrigin: 'CZ',
    },
  });

  const james = await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'James',
      countryOfOrigin: 'NL',
    },
  });

  const janet = await prisma.user.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Janet',
      countryOfOrigin: 'US',
    },
  });

  console.log({ james, janet, katrine });

  // Files

  const file4 = await prisma.file.create({
    data: {
      name: 'Staying fit & healthy',
      type: FileType.MP4,
      duration: 790,
      size: 855376,
      userId: james.id,
    },
  });

  const file5 = await prisma.file.create({
    data: {
      name: 'Why I run',
      type: FileType.MP4,
      duration: 9104,
      size: 755376,
      userId: james.id,
    },
  });

  const file6 = await prisma.file.create({
    data: {
      name: 'Strong 40 Minute Vinyasa Flow',
      type: FileType.MP4,
      duration: 9104,
      size: 755376,
      userId: james.id,
    },
  });

  const file7 = await prisma.file.create({
    data: {
      name: 'climbingMountBlanc',
      type: FileType.WAV,
      duration: 49104,
      size: 9175376,
      userId: katrine.id,
    },
  });

  console.log({ file4, file5, file6, file7 });
}
