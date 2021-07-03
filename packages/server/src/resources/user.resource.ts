import { User } from '@prisma/client';
import prisma from '../../client';

export interface CreateUser {
  name: string;
}

export const createUser = async (user: CreateUser): Promise<User> => {
  return prisma.user.create({ data: user });
};
