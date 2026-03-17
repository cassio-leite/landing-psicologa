"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  User,
  Heart,
  MessageCircle,
  GraduationCap,
  Video,
} from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

const services = [
  {
    icon: User,
    title: "Psicoterapia Individual",
    description: "Atendimento para adultos em busca de autoconhecimento e bem-estar.",
  },
  {
    icon: Heart,
    title: "Terapia para Ansiedade e Depressão",
    description: "Abordagens especializadas para lidar com emoções difíceis e superar desafios.",
  },
  {
    icon: MessageCircle,
    title: "Acompanhamento Emocional",
    description: "Suporte contínuo para promover saúde mental equilibrada.",
  },
  {
    icon: GraduationCap,
    title: "Orientação Vocacional",
    description: "Ajuda a descobrir caminhos profissionais alinhados aos seus valores.",
  },
  {
    icon: Video,
    title: "Sessões Online e Presenciais",
    description: "Flexibilidade para atender no conforto do seu espaço ou no consultório.",
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

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="servicos"
      className="scroll-mt-20 bg-chart-1 py-16 md:py-24"
      aria-label="Serviços Oferecidos"
    >
      <div className="container mx-auto px-4">
        {/* Título com animação direta */}
        <motion.h2
          className="mb-12 text-center font-serif text-4xl font-bold text-foreground md:mb-16 md:text-5xl"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          Serviços oferecidos
        </motion.h2>

        {/* Grid de cards com stagger único */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-8"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
              className={cn(
                "md:col-span-2",
                // Centraliza os dois últimos cards na segunda fileira (desktop/tablet)
                index === 3 && "md:col-start-2",
                index === 4 && "md:col-span-2"
              )}
            >
              <Card className="h-full border-none bg-card hover:-translate-y-1 transition-all duration-300 [transform:translateZ(0)] [backface-visibility:hidden]">
                <CardContent className="flex flex-col items-center p-8 text-center md:p-10">
                  <service.icon className="mb-6 size-12 text-icon md:size-14" />
                  <h3 className="mb-3 font-serif text-xl font-bold text-foreground md:text-2xl [transform:translateZ(0)]">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground text-sm md:text-base [transform:translateZ(0)]">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
