"use client";

import { useSearchStore } from "@/store/use-search-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertySort() {
  const { filters, setSortBy } = useSearchStore();

  return (
    <Select
      value={filters.sortBy}
      onValueChange={(value) => setSortBy(value as typeof filters.sortBy)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Más recientes</SelectItem>
        <SelectItem value="price-asc">Menor precio</SelectItem>
        <SelectItem value="price-desc">Mayor precio</SelectItem>
      </SelectContent>
    </Select>
  );
} 