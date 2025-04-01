import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import type { SocialProvider } from "@/lib/auth-client";
import { socialSignIn } from "@/lib/auth-client";
import { useState } from "react";
import Spinner from "../reusable/Spinner";


// export const prerender = false;

export default function SocialSignInButton({ providers }: { providers: SocialProvider[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = (provider: SocialProvider) => {
    setIsLoading(true);
    socialSignIn(provider)
      .then(() => {})
      .catch(err => {
        // TODO: handle error
        console.log(err);
      })
  }

  if (isLoading) {
    return <Spinner />;
  }
  return <>
    {
      providers.map((provider: SocialProvider ) => (
        <button onClick={() => signIn(provider)} className="w-100">
          <div className="relative p-2 border-1 bg-white rounded-4xl cursor-pointer hover:scale-105 transition-transform">
            <span className="w-6 h-6 text-2xl top-2 rounded-4xl absolute left-5">
              {provider === 'google' && <FaGoogle />}
              {provider === 'facebook' && <FaFacebook />}
            </span>
            Sign in with <span className="capitalize">{provider}</span>
          </div>
        </button>
      ))
    }
  </>
}
