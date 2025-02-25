import { FcGoogle } from "react-icons/fc";
import { signOut, useSession } from "@/lib/auth-client";

export default function SignOutButton() {
  const {
    data: session,
    refetch
  } = useSession();

  // console.log('session: ', session);
  // if (!session) {
  //   return null;
  // }

  const handleSignOut = () => {
    console.log('react signing in');
    signOut()
    .then(() => {})
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <form action="/api/home" method="get">
    <button type="submit" onClick={handleSignOut}>
      <div className=" p-1.5 border-2 border-gray-300 rounded-4xl cursor-pointer hover:scale-110 transition-transform">
        Sign Out
      </div>
    </button>
    </form>
  )
}
