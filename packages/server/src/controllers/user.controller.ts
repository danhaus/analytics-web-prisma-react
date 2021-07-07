import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { isValidCountryCode } from './custom-validators';
import { createUser } from '../services';

export const validateCreate = [
  body('name').exists().isString(),
  body('countryOfOrigin').exists().custom(isValidCountryCode).isString().isUppercase(),
];

export const create = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { name, countryOfOrigin } = req.body;
  const result = await createUser({ name, countryOfOrigin });
  res.json(result);
};
