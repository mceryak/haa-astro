import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';
// import { betterAuth } from "better-auth";
// import { db } from "./drizzle";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";

// export const auth = betterAuth({
//     database: drizzleAdapter(db, {
//       provider: "sqlite", // or "pg" or "mysql"
//     })
// })

export interface Env {
  DB: D1Database;
}

interface KvTable {
  key: string;
  value: string;
}

interface Database {
  kv: KvTable;
}



const dialect = new LibsqlDialect({
  url: import.meta.env.TURSO_DATABASE_URL || "",
  authToken: import.meta.env.TURSO_AUTH_TOKEN || "",
})

export const auth = betterAuth({
  database: {
    dialect,
    type: "sqlite"
  },
  socialProviders: {
    google: {
      clientId: import.meta.env.GOOGLE_AUTH_CLIENT as string,
      clientSecret: import.meta.env.GOOGLE_AUTH_SECRET as string,
    }
  }
});