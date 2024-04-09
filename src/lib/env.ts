import zod from "zod";

const envSchema = zod.object({
  NEXT_PUBLIC_NODE_ENV: zod.string().min(1),
  DATABASE_URL: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
