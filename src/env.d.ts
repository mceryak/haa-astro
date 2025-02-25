type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

/// <reference path="../.astro/types.d.ts" />
declare namespace App {
  interface Locals extends Runtime {
    user: import("better-auth").User | null;
    session: import("better-auth").Session | null;
  }
}

interface ImportMetaEnv {
  readonly D1_ACCOUNT_ID: string;
  readonly D1_ID: string;
  readonly D1_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}