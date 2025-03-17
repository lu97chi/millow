'use client';

import { ReactNode } from 'react';
import { PropertiesProvider } from '@/contexts/PropertiesContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { SessionProvider } from '@/contexts/SessionContext';
import { HeliosChatProvider } from '@/contexts/HeliosChatContext';
import ChatSelector from '@/components/chatSelector/ChatSelector';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PropertiesProvider>
        <ChatProvider>
          <HeliosChatProvider>
            <div className="min-h-screen bg-background">
              <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Tu Portal Inmobiliario</h1>
                <p>Explora nuestras propiedades y consulta con nuestros asistentes virtuales.</p>
                {/* Other page content */}
                {children}
              </div>
            </div>
          </HeliosChatProvider>
        </ChatProvider>
      </PropertiesProvider>
    </SessionProvider>
  );
}