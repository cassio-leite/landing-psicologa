"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface ListItem {
  label: string;
  value: string;
  href?: string;
}

const LIST_ITEMS: ListItem[] = [
  { label: "Nome", value: "Kailaine Leite" },
  { label: "Data de nascimento", value: "[data]" },
  { label: "Endereço", value: "Maceió, Minas Gerais" },
  {
    label: "Email",
    value: "kailaine.leite@yahoo.com",
    href: "mailto:kailaine.leite@yahoo.com",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      ref={ref}
      id="sobre"
      className="scroll-mt-20 bg-chart-2 py-16 md:py-24"
      aria-label="Sobre Mim"
    >
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-[0.45fr_0.55fr] lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* Coluna esquerda: imagem */}
        <div className="flex justify-center p-6 md:block md:p-8">
          <motion.div
            className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/kailaine-1.jpg"
              alt="Dra. Kailaine Leite - Psicóloga"
              fill
              className="object-cover object-top"
              sizes="(max-width: 767px) 100vw, 45vw"
            />
          </motion.div>
        </div>

        {/* Coluna direita: conteúdo */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16">
          <motion.h2
            className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: -30 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sobre Mim
          </motion.h2>
          <motion.div
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="mb-6 font-serif text-xl text-muted-foreground md:text-2xl">
              Dra. Kailaine Leite
            </p>
            <p className="mb-6 text-base leading-relaxed text-foreground md:text-lg">
              Olá, sou Dra. Kailaine Leite, psicóloga formada pela Faculdade
              Universo de Maceió, com especialização em Terapia Cognitivo
              Comportamental. Tenho mais de 10 anos ajudando pessoas a encontrar
              equilíbrio emocional.
            </p>
            <ul className="space-y-3 text-base text-foreground">
              {LIST_ITEMS.map(({ label, value, href }) => (
                <li key={label}>
                  <span className="font-semibold">{label}:</span>{" "}
                  {href ? (
                    <a
                      href={href}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
