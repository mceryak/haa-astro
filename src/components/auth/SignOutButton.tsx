
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        window.location.reload(); // this will automatically redirect away since there is no more session
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <button type="submit" onClick={handleSignOut}>
      <div className=" p-1.5 border-2 border-gray-300 rounded-4xl cursor-pointer hover:scale-110 transition-transform">
        Sign Out
      </div>
    </button>
  )
}
