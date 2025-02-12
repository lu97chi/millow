import type { Property, Agent } from "./property";
import type { ReactNode } from "react";
import { MapLocation } from "./maps";

export interface PropertyStatsProps {
  properties: Property[];
  total: number;
}

export interface ProvidersProps {
  children: ReactNode;
}

export interface ContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

export interface PropertyMapProps {
  properties?: Property[];
  center?: MapLocation;
  zoom?: number;
  showControls?: boolean;
}

export interface PropertyFiltersProps {
  className?: string;
  hideToggle?: boolean;
  onClose?: () => void;
}

export interface AgentCardProps {
  agent: Agent;
}

export interface PropertyCardProps {
  property: Property;
}

export interface PropertyGridProps {
  properties: Property[];
}

export interface ShareButtonProps {
  title: string;
  url: string;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
}
