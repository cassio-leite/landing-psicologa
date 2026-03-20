"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export function ClearFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const hasActiveFilters = !!(search || category);

  if (!hasActiveFilters) return null;

  const activeFiltersCount = [search, category].filter(Boolean).length;

  const handleClear = () => {
    router.push("/blog", { scroll: false });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClear}
      className="group h-8 gap-1.5 rounded-full border-dashed px-3 text-xs font-medium transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
    >
      <X className="size-3 transition-transform group-hover:rotate-90" />
      <span>
        Limpar Filtros
        <span className="ml-1 opacity-60">({activeFiltersCount})</span>
      </span>
    </Button>
  );
}
