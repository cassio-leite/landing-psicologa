"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("search") || "");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmedValue = value.trim();

      if (trimmedValue) {
        params.set("search", trimmedValue);
      } else {
        params.delete("search");
      }
      
      // Sempre removemos a página ao buscar para evitar resultados vazios em páginas inexistentes
      params.delete("page");
      
      // Mantemos a categoria para permitir busca filtrada dentro da categoria
      // Se o usuário quiser buscar em tudo, ele deve limpar a categoria ou clicar em "Todos"
      
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, router, pathname, searchParams]);

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar por título, categoria ou assunto..."
          className="h-12 pl-12 pr-12 text-base transition-all focus:ring-2 focus:ring-primary/20"
          aria-label="Buscar posts"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
