import {
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-chart-5 text-foreground py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start text-center md:text-left">
          {/* COLUNA 1 - Dra. Kailaine Leite */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className={`text-xl font-bold ${lora.className}`}>
              Dra. Kailaine Leite
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Psicóloga Clínica Especializada em Terapia Cognitivo-Comportamental.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/553199659738"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors text-foreground"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href="https://www.instagram.com/kaah_baker?igsh=MTcwNHVtYmd1Y3Fqcg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/seu_linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          {/* COLUNA 2 - Contato */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin className="size-5 text-primary" />
                <span>Maceió, Minas Gerais</span>
              </div>
              <a
                href="mailto:kailaine.leite@yahoo.com"
                className="flex items-center gap-3 justify-center md:justify-start hover:text-primary transition-colors text-muted-foreground"
              >
                <Mail className="size-5 text-primary" />
                <span>kailaine.leite@yahoo.com</span>
              </a>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Clock className="size-5 text-primary" />
                <span>Segunda a Sexta: 09:00 - 18:00</span>
              </div>
              <a
                href="tel:3199659738"
                className="flex items-center gap-3 justify-center md:justify-start hover:text-primary transition-colors text-muted-foreground"
              >
                <Phone className="size-5 text-primary" />
                <span>(31) 9965-9738</span>
              </a>
            </div>
          </div>

          {/* COLUNA 3 - Links Rápidos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#inicio" className="hover:text-primary transition-colors">
                Início
              </a>
              <a href="#sobre" className="hover:text-primary transition-colors">
                Sobre Mim
              </a>
              <a href="#servicos" className="hover:text-primary transition-colors">
                Serviços
              </a>
              <a href="#contato" className="hover:text-primary transition-colors">
                Contato
              </a>
            </nav>
          </div>
        </div>

        {/* RODAPÉ INFERIOR */}
        <div className="border-t border-border pt-8 mt-12 md:mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Dra. Kailaine Leite. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
