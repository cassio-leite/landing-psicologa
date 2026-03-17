import Image from "next/image";
import { Lora } from "next/font/google";
import { HeaderNav } from "@/app/_components/header-nav";
import { HeaderMobileMenu } from "@/app/_components/header-mobile-menu";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

export function Header() {
  return (
    <header
      className={`sticky top-0 z-50 w-full bg-chart-5 shadow-sm ${lora.className}`}
    >
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        <a
          href="#inicio"
          className="flex-shrink-0"
          aria-label="KL Psicóloga - Início"
        >
          <Image
            src="/images/logo.png"
            alt="KL Psicóloga"
            width={140}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </a>
        <div className="hidden md:flex">
          <HeaderNav />
        </div>
        <div className="md:hidden">
          <HeaderMobileMenu />
        </div>
      </div>
    </header>
  );
}
