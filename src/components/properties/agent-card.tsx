"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Building2 } from "lucide-react";

interface AgentCardProps {
  name: string;
  title: string;
  company: string;
  image: string;
  phone: string;
  email: string;
  experience: number;
  activeListings: number;
}

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
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-none">
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4" />
              <span>{company}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {experience} años de experiencia
          </Badge>
          <Badge variant="outline" className="text-xs">
            {activeListings} propiedades activas
          </Badge>
        </div>

        <div className="mt-6 space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href={`tel:${phone}`}>
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <a href={`mailto:${email}`}>
              <Mail className="h-4 w-4" />
              {email}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 