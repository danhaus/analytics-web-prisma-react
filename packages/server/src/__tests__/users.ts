import prisma from '../../client';
import { createUser, NewUser, retrieveAllUsers } from '../services';
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

  it('creates new user', async () => {
    const newUser: NewUser = {
      name: 'Jack',
      countryOfOrigin: 'UK',
    };
    const user = await createUser(newUser);
    expect(user).toEqual(expect.objectContaining(newUser));
  });

  it('retrieves all users', async () => {
    const allUsers = await retrieveAllUsers();
    expect(allUsers).toHaveLength(3);
  });
});
