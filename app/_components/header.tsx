"use client";

import Image from "next/image";
import { Lora } from "next/font/google";
import { HeaderNav } from "@/app/_components/header-nav";
import { HeaderMobileMenu } from "@/app/_components/header-mobile-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        lora.className,
        isScrolled
          ? "bg-chart-5 shadow-lg border-b border-border/10"
          : "bg-header-background/80 backdrop-blur-md border-b border-border/40"
      )}
    >
      <div className={cn(
        "container mx-auto flex items-center justify-between px-6 transition-all duration-300 md:px-8",
        isScrolled ? "h-20" : "h-24 md:h-28"
      )}>
        <Link
          href="/"
          className="flex items-center gap-3 md:gap-4 transition-all duration-300"
          aria-label="KL Psicóloga - Início"
        >
          <Image
            src="/images/logo.png"
            alt="KL Psicóloga"
            width={180}
            height={60}
            className={cn(
              "w-auto transition-all duration-300",
              isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
            )}
            priority
          />
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-xl font-bold uppercase tracking-wide transition-colors duration-300 md:text-2xl",
              "text-foreground"
            )}>
              Kailaine Leite
            </span>
            <span className={cn(
              "text-sm transition-colors duration-300 md:text-base",
              "text-muted-foreground"
            )}>
              Psicóloga
            </span>
          </div>
        </Link>

        <div className="hidden md:flex">
          <HeaderNav isScrolled={isScrolled} />
        </div>
        <div className="md:hidden">
          <HeaderMobileMenu />
        </div>
      </div>
    </header>
  );
}
