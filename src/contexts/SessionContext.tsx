import { createContext, useContext, useState, ReactNode } from 'react';

interface SessionContextType {
  sessionId: string | undefined;
  setSessionId: (id: string | undefined) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        setSessionId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
} 