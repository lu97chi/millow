"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
//import Image from "next/image";
//import logo from "../../../public/logoNoBg.png";

import { Menu, X } from "lucide-react";

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

  // State to control mobile menu open/close
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <span className="font-heading text-xl">Tu Hogar</span>
          {/*<Image src={logo} alt="Tu Hogar" width={32} height={32} />*/}
        </Link>

        {/* Desktop Nav Toggle (Hamburger) - Hidden above sm breakpoint */}
        <button
          type="button"
          className="sm:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
        <nav
          className={cn(
            "absolute top-16 left-0 w-full flex-col items-start gap-2 bg-background shadow-md sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:shadow-none transition-all",
            mobileMenuOpen ? "flex" : "hidden sm:flex"
          )}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block w-full rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent sm:w-auto sm:px-3 sm:py-1.5",
                pathname === item.href ? "bg-accent" : "text-muted-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)} // close menu on link click
            >
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2 sm:px-0 sm:py-0">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
