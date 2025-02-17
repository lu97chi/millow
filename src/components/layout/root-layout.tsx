"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatUI } from "@/components/chat/chat-ui";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Bot } from "lucide-react";
import { PropertyProvider } from "@/providers/property-context";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const showChat = pathname !== "/";
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <PropertyProvider>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <main className={cn(
            "flex-1 relative z-0",
            showChat && "lg:pr-[350px]" // Only add padding on desktop
          )}>
            {children}
          </main>
          {showChat && (
            <>
              {/* Desktop Chat Sidebar */}
              <div className="fixed right-0 top-[64px] bottom-0 w-[350px] border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block z-50">
                <ChatUI />
              </div>

              {/* Mobile Chat */}
              <div className="fixed lg:hidden">
                {/* Chat Bubble Button */}
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={cn(
                    "fixed bottom-4 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-[100]",
                    isChatOpen && "opacity-0 pointer-events-none"
                  )}
                >
                  <MessageSquare className="h-6 w-6" />
                </button>

                {/* Mobile Chat Panel */}
                <div className={cn(
                  "fixed right-4 bottom-20 w-[calc(100vw-32px)] sm:w-[450px] h-[600px] max-h-[85vh] bg-background rounded-lg shadow-lg border transition-all duration-200 z-[100]",
                  isChatOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}>
                  {/* Chat Header with Close Button */}
                  <div className="absolute top-0 left-0 right-0 h-14 border-b bg-background flex items-center justify-between px-4 rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-8 w-8 items-center justify-center">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
                        <Bot className="relative h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold">Luna</span>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Chat Content */}
                  <div className="absolute top-14 left-0 right-0 bottom-0 rounded-b-lg overflow-hidden">
                    <ChatUI />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </PropertyProvider>
  );
} 