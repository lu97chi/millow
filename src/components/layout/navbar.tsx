import Link from "next/link";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold inline-block">Millow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/properties">Propiedades</Link>
            <Link href="/favorites" className="flex items-center gap-2">
              Favoritos
              {favoritesCount > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5">
                  {favoritesCount}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 