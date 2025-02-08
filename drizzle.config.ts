import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './schemas/drizzle.ts',
  out: '.drizzle-out',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: 'a78302cdcde46ce73a37e339f7be75d4',
    databaseId: 'ddc42abe-6758-4510-83c4-88c9af9a8b05',
    token: 'kz5jlQxPH8w905XKpR7rnKPfAfzYI5lEyA2esmWv'
  }
};

export default config satisfies Config;