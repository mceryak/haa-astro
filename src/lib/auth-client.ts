import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, getSession, useSession, listSessions, signOut } = createAuthClient({
  baseURL: "https://michaelceryak.com"
  // baseURL: "http://localhost:4321"
  // baseURL: "http://localhost:8788"
});

export type SocialProvider = "github" | "apple" | "discord" | "facebook" | "microsoft" | "google" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "reddit";

export const socialSignIn = async (providerId: SocialProvider) => {
  const data = await signIn.social({
    provider: providerId,
    callbackURL: "/sign-in" // callback to sign in so that it's forced to reload (it will redirect to profile)
  })
}