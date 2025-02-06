"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/layout/search-command";
import { cn } from "@/lib/utils";
import { useSearchStore, initialFilters } from "@/store/use-search-store";

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
  const { filters, resetFilters } = useSearchStore();

  const hasActiveFilters = 
    filters.propertyType.length > 0 ||
    filters.location.state ||
    filters.location.city ||
    filters.location.area ||
    filters.features.bedrooms ||
    filters.features.bathrooms ||
    filters.propertyAge !== undefined ||
    filters.priceRange.min !== initialFilters.priceRange.min ||
    filters.priceRange.max !== initialFilters.priceRange.max ||
    (filters.features.constructionSize?.min !== initialFilters.features.constructionSize?.min) ||
    (filters.features.constructionSize?.max !== initialFilters.features.constructionSize?.max) ||
    (filters.features.lotSize?.min !== initialFilters.features.lotSize?.min) ||
    (filters.features.lotSize?.max !== initialFilters.features.lotSize?.max) ||
    filters.amenities.length > 0 ||
    filters.maintenanceFee !== undefined ||
    filters.sortBy !== initialFilters.sortBy ||
    filters.query !== initialFilters.query;

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
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
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
            {hasActiveFilters && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 rounded-full px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={resetFilters}
                >
                  <X className="h-3 w-3" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
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