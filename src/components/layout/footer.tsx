"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const navigation = {
  main: [
    { name: "Acerca de", href: "/about" },
    { name: "Propiedades", href: "/properties" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contact" },
    { name: "Términos", href: "/terms" },
    { name: "Privacidad", href: "/privacy" },
  ],
  locations: [
    "Ciudad de México",
    "Guadalajara",
    "Monterrey",
    "Querétaro",
    "Cancún",
    "Los Cabos",
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube,
    },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading text-xl font-bold">Millow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Encuentra tu hogar ideal en México con nuestra plataforma
              inmobiliaria impulsada por IA.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation & Locations */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Navegación</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Ubicaciones</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.locations.map((location) => (
                    <li key={location}>
                      <Link
                        href={`/properties?location=${location}`}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {location}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Millow. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 