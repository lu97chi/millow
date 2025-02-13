"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

function NotFoundContent() {
  return (
    <div className="flex-1">
      <div className="container flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
        <p className="text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button asChild className="mt-4">
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
} 