import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './models/schema.ts',
  out: './models',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.D1_ACCOUNT_ID!,
    databaseId: process.env.D1_ID!,
    token: process.env.D1_TOKEN!
  }
};

export default config satisfies Config;