import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { socialSignIn, useSession } from "@/lib/auth-client";

export default function SocialSignInButton({ providerId }: { providerId: 'google' | 'facebook' }) {
  const {
      data: session
    } = useSession();
  
    // console.log('session: ', session);
    // if (session) {
    //   return null;
    // }

  const signIn = () => {
    console.log('react signing in');
    socialSignIn(providerId)
    .then(() => {})
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <button onClick={signIn} className="w-100">
      <div className="relative p-2 border-1 bg-white rounded-4xl cursor-pointer hover:scale-105 transition-transform">
        <span className="w-6 h-6 text-2xl top-2 rounded-4xl absolute left-5">
          {providerId === 'google' && <FaGoogle />}
          {providerId === 'facebook' && <FaFacebook />}
        </span>
        Sign in with <span className="capitalize">{providerId}</span>
      </div>
    </button>
  )
}
