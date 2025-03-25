import { createContext, type ReactNode } from "react";
import { useSession } from "@/lib/auth-client";
import type { User, Session } from "better-auth";

const defaultContext: { user: User | undefined, session: Session | undefined } = { user: undefined, session: undefined };
export const SessionContext = createContext(defaultContext);

export function SessionContextProvider ({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  return <>
    {!isPending && <SessionContext value={{ user: session?.user, session: session?.session }}>{children}</SessionContext>}
  </>
}