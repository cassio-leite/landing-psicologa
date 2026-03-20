"use client";

import { cn } from "@/app/_lib/utils";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

const CATEGORY_COLORS: Record<string, string> = {
  "Saúde Mental": "bg-blue-100 text-blue-700",
  Terapia: "bg-purple-100 text-purple-700",
  Ansiedade: "bg-amber-100 text-amber-700",
  Depressão: "bg-red-100 text-red-700",
  Relacionamentos: "bg-pink-100 text-pink-700",
  Autocuidado: "bg-green-100 text-green-700",
  TCC: "bg-indigo-100 text-indigo-700",
  Dicas: "bg-teal-100 text-teal-700",
};

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const colorClass = CATEGORY_COLORS[category] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={cn(
        "inline-block rounded-full font-medium",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
        colorClass
      )}
    >
      {category}
    </span>
  );
}
