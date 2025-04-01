import { useContext } from 'react';
import { SessionContext, SessionContextProvider } from '../betterAuth/ContextProviders/SessionContextProvider'


export default function ProfileBtnWrapper() {
  return <SessionContextProvider>
    <ProfileBtn />
  </SessionContextProvider>;
}


function ProfileBtn() {
  const { session } = useContext(SessionContext);
  return session 
  ? (
    <button>Profile</button>
  ) 
  : (
    <button>Sign In</button>
  );
}
