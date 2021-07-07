import { User } from '@prisma/client';
import prisma from '../../client';

export interface NewUser {
  name: string;
  countryOfOrigin: string;
}

export const createUser = async (user: NewUser): Promise<User> => {
  return prisma.user.create({ data: user });
};
