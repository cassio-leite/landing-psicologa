"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";

const SECTIONS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
] as const;

function scrollToSection(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const headerHeight = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

export function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);

  function handleNavClick(href: string) {
    // 1. Fecha o Sheet imediatamente
    setOpen(false);
    // 2. Aguarda a animação de saída do Radix (~300ms) antes de rolar
    setTimeout(() => scrollToSection(href), 350);
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
        className="flex flex-col bg-chart-5"
      >
        <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8 px-4"
          aria-label="Navegação principal"
        >
          {SECTIONS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
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