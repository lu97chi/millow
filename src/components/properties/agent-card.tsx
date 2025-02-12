"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Building2, UserRound } from "lucide-react";
import { AgentCardProps } from "@/types";

export function AgentCard({
  name,
  title,
  company,
  image,
  phone,
  email,
  experience,
  activeListings,
}: AgentCardProps) {
  // Only show stats section if we have valid non-zero values
  const hasValidExperience = experience !== undefined && experience > 0;
  const hasValidListings = activeListings !== undefined && activeListings > 0;
  const showStats = hasValidExperience || hasValidListings;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <UserRound className="h-4 w-4" />
          <span>Agente Inmobiliario</span>
        </div>

        <div className="flex items-start gap-4">
          {image && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold">{name}</h3>
            {title && title.length > 0 && (
              <p className="text-sm text-muted-foreground">{title}</p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {company}
            </div>
          </div>
        </div>

        {showStats && (
          <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg border p-4">
            {hasValidExperience && (
              <div>
                <p className="text-sm font-medium">{experience}</p>
                <p className="text-xs text-muted-foreground">Años de experiencia</p>
              </div>
            )}
            {hasValidListings && (
              <div>
                <p className="text-sm font-medium">{activeListings}</p>
                <p className="text-xs text-muted-foreground">Propiedades activas</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 space-y-2">
          {phone && phone.length > 0 && (
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href={`tel:${phone}`}>
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </Button>
          )}
          {email && email.length > 0 && (
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <a href={`mailto:${email}`}>
                <Mail className="h-4 w-4" />
                {email}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 