import * as Joi from "joi";

export const envValidationSchema =
  Joi.object({
    PORT: Joi.number().default(5000),

    NODE_ENV: Joi.string().default(
      "development",
    ),

    CLIENT_URL: Joi.string().required(),

    MONGODB_URI:
      Joi.string().required(),

    JWT_SECRET: Joi.string()
      .min(32)
      .required(),

    JWT_REFRESH_SECRET:
      Joi.string()
        .min(32)
        .required(),

    JWT_EXPIRES: Joi.string()
      .default("15m"),

    JWT_REFRESH_EXPIRES:
      Joi.string().default("30d"),

    GEMINI_API_KEY:
      Joi.string()
        .allow("")
        .optional(),

    // Optional SMTP — newsletter notify emails need these
    MAIL_HOST: Joi.string().optional(),
    MAIL_PORT: Joi.number().optional(),
    MAIL_USER: Joi.string().optional(),
    MAIL_PASSWORD: Joi.string().optional(),
    MAIL_FROM: Joi.string().optional(),
    NEWSLETTER_NOTIFY_EMAIL: Joi.string()
      .email()
      .optional(),
  });