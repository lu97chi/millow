import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/providers";
import { RootLayout } from "@/components/layout/root-layout";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { SearchProvider } from "@/providers/search-provider";
import { Toaster } from "@/components/providers/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Cal Sans
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

// JetBrains Mono
const fontMono = localFont({
  src: "../assets/fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Millow - AI-Powered Real Estate Platform",
  description:
    "Find your perfect property in Mexico with our AI-powered real estate platform.",
  keywords: [
    "real estate",
    "mexico",
    "property",
    "AI",
    "chat",
    "search",
    "buy",
    "rent",
  ],
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
          fontMono.variable
        )}
      >
        <SearchProvider>
          <Providers>
            <RootLayout>
              {children}
              <Toaster />
            </RootLayout>
          </Providers>
        </SearchProvider>
      </body>
    </html>
  );
}
