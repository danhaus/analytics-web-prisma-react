import { NewUser, createUser } from '.';
import { prismaMock } from '../../singleton';

it('creates new user', async () => {
  const user: NewUser = {
    name: 'John',
    countryOfOrigin: 'IS',
  };
  prismaMock.user.create.mockResolvedValue({ ...user, id: 1 });

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'John',
    countryOfOrigin: 'IS',
  });
});
