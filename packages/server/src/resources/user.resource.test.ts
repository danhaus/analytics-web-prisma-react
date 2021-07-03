import { CreateUser, createUser } from '.';
import { prismaMock } from '../../singleton';

it('creates new user', async () => {
  const user: CreateUser = {
    name: 'John',
  };
  prismaMock.user.create.mockResolvedValue({ ...user, id: 1 });

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'John',
  });
});
