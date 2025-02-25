import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, getSession, useSession, listSessions, signOut } = createAuthClient({
  baseURL: "https://michaelceryak.com"
});

export const socialSignIn = async (providerId: 'google' | 'facebook') => {
  const data = await signIn.social({
    provider: providerId,
    callbackURL: "/profile"
  })
}