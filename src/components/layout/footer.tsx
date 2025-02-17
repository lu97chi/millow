"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading text-xl font-bold">Tu Hogar</span>
              <Badge variant="secondary" className="font-mono text-xs">BETA</Badge>
            </Link>
            <p className="max-w-[42rem] text-sm text-muted-foreground">
              Encuentra tu hogar ideal en México con nuestra plataforma
              inmobiliaria impulsada por IA.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-center gap-4 border-t py-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tu Hogar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 