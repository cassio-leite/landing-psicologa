"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/app/_components/ui/button";

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <div
      ref={ref}
      className="grid min-h-[calc(100dvh-4rem)] grid-cols-1 md:grid-cols-2 lg:h-[calc(100vh-4rem)]"
    >
      {/* Coluna esquerda: texto */}
      <div className="flex min-h-[40vh] flex-col items-center justify-center bg-chart-1 px-8 py-16 md:min-h-full md:px-16 lg:px-20 lg:py-20 xl:px-28">
        <div className="flex w-full max-w-2xl flex-col space-y-8">
          <motion.h1
            className="font-serif text-4xl font-bold leading-tight text-foreground lg:text-5xl"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Dra. Kailaine Leite - Psicóloga Clínica Especializada
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed text-foreground lg:text-xl"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Transforme sua vida com suporte psicológico especializado. Dra.
            Kailaine Leite oferece um caminho para o bem-estar e autoconhecimento,
            com abordagens terapêuticas modernas e eficazes.
          </motion.p>
          <motion.div
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              asChild
              className="bg-[linear-gradient(-45deg,#5b4bab,#7b6ab3)] px-10 py-6 font-bold uppercase text-white shadow-md transition-all duration-300 hover:shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:[-webkit-transform:translate3d(0,-2px,0)] hover:[transform:translate3d(0,-2px,0)] rounded-full [transform:translate3d(0,0,0)] [backface-visibility:hidden] [perspective:1000px] [-webkit-font-smoothing:subpixel-antialiased] subpixel-antialiased"
            >
              <a href="#contato" className="[transform:translate3d(0,0,0)] [backface-visibility:hidden]">AGENDE SUA CONSULTA</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Coluna direita: imagem (lado a lado no desktop) */}
      <div className="relative min-h-[500px] w-full md:min-h-full bg-hero-right-background">
        <motion.div
          className="relative size-full min-h-[500px] md:min-h-full bg-hero-right-background"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }
          }
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/images/hero/kailaine-2.jpg"
            alt="Dra. Kailaine Leite - Psicóloga"
            fill
            className="object-cover object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
