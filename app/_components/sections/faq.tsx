"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Como funciona a primeira consulta?",
    answer:
      "A primeira sessão é um momento de acolhimento onde conversaremos sobre suas necessidades, expectativas e histórico. Juntos, traçaremos um plano terapêutico personalizado. A duração é de aproximadamente 50 minutos.",
  },
  {
    question: "Quanto custa uma sessão?",
    answer:
      "O valor da sessão é sob consulta. Aceito pagamento via PIX, transferência bancária ou cartão. Entre em contato para saber sobre pacotes mensais com desconto.",
  },
  {
    question: "Atende online ou presencial?",
    answer:
      "Ofereço ambas as modalidades! As sessões online são realizadas por videochamada em plataforma segura e confidencial. O atendimento presencial ocorre em Maceió, Minas Gerais. Você escolhe o que for mais confortável.",
  },
  {
    question: "Com que frequência preciso fazer terapia?",
    answer:
      "Geralmente recomendo sessões semanais, mas a frequência é ajustada conforme suas necessidades e evolução. Em alguns casos, sessões quinzenais podem ser adequadas.",
  },
  {
    question: "Quanto tempo dura o tratamento?",
    answer:
      "Não existe um prazo fixo. A terapia é um processo individual e varia de acordo com seus objetivos. Algumas pessoas sentem melhoras em semanas, outras preferem um acompanhamento mais longo para crescimento contínuo.",
  },
  {
    question: "Qual abordagem terapêutica você utiliza?",
    answer:
      "Trabalho com Terapia Cognitivo-Comportamental (TCC), uma abordagem cientificamente comprovada que ajuda a identificar e modificar padrões de pensamento e comportamento que causam sofrimento.",
  },
  {
    question: "O sigilo é garantido?",
    answer:
      "Sim! O sigilo profissional é garantido pelo Código de Ética do Psicólogo (Resolução CFP nº 010/05). Tudo o que conversamos permanece confidencial, salvo situações previstas em lei (risco de vida).",
  },
  {
    question: "Preciso ter um diagnóstico para iniciar?",
    answer:
      "Não! Você não precisa de diagnóstico prévio. A terapia é para qualquer pessoa que busca autoconhecimento, bem-estar emocional ou ajuda para enfrentar desafios da vida.",
  },
  {
    question: "Aceita convênio médico?",
    answer:
      "Não trabalho com convênios, apenas particular. Porém, forneço recibo para reembolso junto ao seu plano de saúde.",
  },
  {
    question: "Como faço para agendar?",
    answer:
      "É simples! Entre em contato pelo WhatsApp (31) 99659-7380 ou email kailaine.leite@yahoo.com. Responderei o mais rápido possível e agendaremos um horário que funcione para você.",
  },
];

export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="faq"
      className="scroll-mt-20 bg-background py-16 md:py-24"
      aria-label="Perguntas Frequentes"
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl [transform:translateZ(0)]">
              Perguntas Frequentes
            </h2>
            <p className="text-muted-foreground text-lg [transform:translateZ(0)]">
              Tire suas dúvidas sobre o atendimento
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border-none bg-card px-6 shadow-sm [transform:translateZ(0)]"
              >
                <AccordionTrigger className="py-5 text-left text-lg font-semibold text-foreground hover:no-underline [transform:translateZ(0)]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground [transform:translateZ(0)]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
