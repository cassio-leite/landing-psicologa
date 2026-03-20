"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";

const SECTIONS = [
  { href: "/#inicio", id: "inicio", label: "Início" },
  { href: "/#sobre", id: "sobre", label: "Sobre" },
  { href: "/#servicos", id: "servicos", label: "Serviços" },
  { href: "/#contato", id: "contato", label: "Contato" },
  { href: "/blog", id: "blog", label: "Blog" },
] as const;

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function scrollToSection(id: string, href: string) {
    if (id === "blog") {
      router.push("/blog");
      return;
    }

    if (pathname !== "/") {
      router.push(href);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const headerHeight = 80; // h-20 aproximado
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function handleNavClick(id: string, href: string) {
    setOpen(false);
    setTimeout(() => scrollToSection(id, href), 350);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col bg-background"
      >
        <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8 px-4"
          aria-label="Navegação principal"
        >
          {SECTIONS.map(({ href, id, label }) => (
            <button
              key={href}
              onClick={() => handleNavClick(id, href)}
              className="w-full py-2 text-center font-serif text-2xl font-medium text-foreground transition-colors hover:text-foreground/80"
            >
              {label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}