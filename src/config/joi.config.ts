import * as Joi from 'joi';

export const JoiConfig = Joi.object({
  NODE_ENV: Joi.string().required().default('dev'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  API_SECRET: Joi.string().required(),
  ACCESS_TOKEN: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  BEARER_TOKEN: Joi.string().required(),
  APP_ID: Joi.string().required(),
});
