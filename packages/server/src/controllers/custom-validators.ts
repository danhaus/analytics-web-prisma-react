import { FileType } from '@prisma/client';
import { CustomValidator } from 'express-validator';

export const isValidFileType: CustomValidator = (value) => {
  if (Object.values(FileType).includes(value)) {
    return true;
  }
  throw Error('Incorrect type of file');
};
