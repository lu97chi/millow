"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatUI } from "@/components/chat/chat-ui";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const showChat = pathname !== "/";

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <main className={cn("flex-1", showChat && "pr-[350px]")}>
          {children}
        </main>
        {showChat && (
          <div className="fixed right-0 top-[64px] bottom-0 w-[350px] border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <ChatUI />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 