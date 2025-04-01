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
    <a href='/profile'>Profile</a>
  ) 
  : (
    <a href='/sign-in'>Sign In</a>
  );
}
