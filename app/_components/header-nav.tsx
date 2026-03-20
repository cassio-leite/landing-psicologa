"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/app/_lib/utils";

const SECTIONS = [
  { href: "/#inicio", id: "inicio", label: "Início" },
  { href: "/#sobre", id: "sobre", label: "Sobre" },
  { href: "/#servicos", id: "servicos", label: "Serviços" },
  { href: "/#contato", id: "contato", label: "Contato" },
  { href: "/blog", id: "blog", label: "Blog" },
] as const;

export function HeaderNav({ className, isScrolled }: { className?: string, isScrolled?: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (href: string, id: string) => {
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

    const headerHeight = 96; // Aproximado para h-24
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/blog")) {
        setActiveId("blog");
      } else {
        setActiveId(null);
      }
      return;
    }

    const ids = SECTIONS.filter((s) => s.id !== "blog").map((s) => s.id);

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
  }, [pathname]);

  return (
    <nav
      className={cn("flex items-center gap-8", className)}
      aria-label="Navegação principal"
    >
      {SECTIONS.map(({ href, id, label }) => {
        const isActive = activeId === id;
        return (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(href, id);
            }}
            className={cn(
              "text-lg transition-colors duration-300 hover:text-foreground/80",
              isActive && "font-semibold border-b-2 border-primary",
              "text-foreground"
            )}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
