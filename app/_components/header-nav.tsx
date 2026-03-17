"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/_lib/utils";

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

  const headerHeight = 64; // h-16
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({ top, behavior: "smooth" });
}

export function HeaderNav({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <nav
      className={cn("flex items-center gap-8", className)}
      aria-label="Navegação principal"
    >
      {SECTIONS.map(({ href, label }) => {
        const id = href.slice(1);
        const isActive = activeId === id;
        return (
          <a
          key={href}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(href);
          }}
          className={cn(
            "text-foreground transition-colors hover:text-foreground/80",
            isActive && "font-semibold border-b-2 border-primary"
          )}
        >
          {label}
        </a>
        );
      })}
    </nav>
  );
}
