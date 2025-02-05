"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/layout/search-command";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Propiedades",
    href: "/properties",
  },
  {
    name: "Favoritos",
    href: "/favorites",
  },
];

export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  // Listen for search toggle events
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl">Millow</span>
        </Link>

        {/* Search */}
        <div className="flex flex-1 items-center">
          <Button
            variant="outline"
            className="relative w-full max-w-2xl justify-start text-sm text-muted-foreground"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Buscar propiedades...
            <kbd className="pointer-events-none absolute right-3 top-[50%] hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                pathname === item.href
                  ? "bg-accent"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>

      <SearchCommand open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
} 