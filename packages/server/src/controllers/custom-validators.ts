import { FileType } from '@prisma/client';
import { getName } from 'country-list';
import { CustomValidator } from 'express-validator';

export const isValidFileType: CustomValidator = (value) => {
  if (Object.values(FileType).includes(value)) {
    return true;
  }
  throw Error('Incorrect type of file');
};

export const isValidCountryCode: CustomValidator = (countryCode) => {
  if (getName(countryCode)) {
    return true;
  }
  throw Error('Invalid country code');
};
