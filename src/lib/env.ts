import zod from "zod";

const envSchema = zod.object({
  NEXT_PUBLIC_NODE_ENV: zod.string().min(1),
  DATABASE_URL: zod.string().min(1),
  API_SECRET_KEY: zod.string().min(1),
  SENDGRID_API_KEY: zod.string().min(1),
  TREASURYPRIME_API_BASE_URL: zod.string().min(1),
  TREASURYPRIME_KEY_ID: zod.string().min(1),
  TREASURYPRIME_KEY_SECRET: zod.string().min(1),
  

});

export const env = envSchema.parse(process.env);
