'use client';

import { ReactNode } from 'react';
import { PropertiesProvider } from '@/contexts/PropertiesContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { SessionProvider } from '@/contexts/SessionContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PropertiesProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </PropertiesProvider>
    </SessionProvider>
  );
} 