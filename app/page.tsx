import { Hero } from "@/app/_components/sections/hero";
import { About } from "@/app/_components/sections/about";
import { Services } from "@/app/_components/sections/services";
import { Faq } from "@/app/_components/sections/faq";
import { Contact } from "@/app/_components/sections/contact";
import { PersonJsonLd, OrganizationJsonLd } from "@/app/_components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function Home() {
  return (
    <main>
      <PersonJsonLd
        name="Dra. Kailaine Leite"
        jobTitle="Psicóloga Clínica"
        image={`${SITE_URL}/images/logo.png`}
        sameAs={[
          "https://instagram.com/kailaineleite.psi", // Assuming some common format, but keeping it flexible
          "https://linkedin.com/in/kailaineleite",
        ]}
      />

      <OrganizationJsonLd
        name="Dra. Kailaine Leite - Psicóloga"
        logo={`${SITE_URL}/images/logo.png`}
        url={SITE_URL}
        contactPoint={{
          telephone: "+55-11-99999-9999", // Placeholder until real one is provided
          contactType: "Atendimento",
        }}
      />

      <Hero />
      <About />
      <Services />
      <Faq />
      <Contact />
    </main>
  );
}
