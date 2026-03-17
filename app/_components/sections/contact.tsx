"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "(31) 9 9659-7380",
    href: "https://wa.me/5531996597380",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "kailaine.leite@yahoo.com",
    href: "mailto:kailaine.leite@yahoo.com",
  },
  {
    icon: MapPin,
    title: "Endereço",
    value: "Belo Horizonte, MG",
  },
  {
    icon: Clock,
    title: "Horário",
    value: "Segunda a Sexta: 08h às 20h",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="contato"
      className="scroll-mt-20 bg-chart-2 py-16 md:py-24"
      aria-label="Contato e Informações"
    >
      <div className="container mx-auto px-4">
        {/* Título e Texto Introdutório */}
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Contato e Informações
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "opacity" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Estou disponível para tirar suas dúvidas e agendar sua primeira
            sessão. Entre em contato pelos canais abaixo ou visite-me em meu
            consultório.
          </motion.p>
        </div>

        {/* Grid de cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {contactInfo.map((item, index) => {
            const isLastRow = index === 3;
            const CardWrapper = item.href ? "a" : "div";

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
                className={cn(
                  "col-span-1",
                  isLastRow && "md:col-start-1" // Alinha o último card à esquerda na segunda fileira
                )}
              >
                <CardWrapper
                  {...(item.href
                    ? {
                        href: item.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={cn(
                    "block h-full transition-all duration-300 hover:-translate-y-1 [transform:translateZ(0)] [backface-visibility:hidden]",
                    !item.href && "cursor-default hover:translate-y-0"
                  )}
                >
                  <Card className="h-full border-none bg-white shadow-md rounded-2xl [transform:translateZ(0)]">
                    <CardContent className="flex flex-col items-center p-8 text-center md:p-10 [transform:translateZ(0)]">
                      <item.icon className="mb-6 size-12 text-icon md:size-14" />
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
                        {item.value}
                      </p>
                    </CardContent>
                  </Card>
                </CardWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
