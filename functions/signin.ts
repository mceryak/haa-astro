import { signIn } from "@/lib/auth-client";

export const signInSocial = async (context) => {
  const data = await signIn.social({
    provider: 'google',
    callbackURL: "/sign-in" // callback to sign in so that it's forced to reload (it will redirect to profile)
  })
  return new Response(JSON.stringify({ success: true }));
}