"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/_components/ui/button";

interface CategoryWithCount {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryWithCount[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "Todos";

  const totalPosts = categories.reduce((acc, cat) => acc + cat.count, 0);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category === "Todos") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    
    params.delete("page");
    
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const isTodosActive = currentCategory.toLowerCase() === "todos";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant={isTodosActive ? "default" : "secondary"}
        size="sm"
        className="rounded-full h-8 px-4 text-xs font-medium transition-all"
        onClick={() => handleCategoryClick("Todos")}
      >
        Todos
        <span className="ml-1.5 opacity-60">({totalPosts})</span>
      </Button>

      {categories.map((category) => {
        const isActive = currentCategory.toLowerCase() === category.name.toLowerCase();
        return (
          <Button
            key={category.name}
            variant={isActive ? "default" : "secondary"}
            size="sm"
            className="rounded-full h-8 px-4 text-xs font-medium transition-all"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
            <span className="ml-1.5 opacity-60">({category.count})</span>
          </Button>
        );
      })}
    </div>
  );
}
