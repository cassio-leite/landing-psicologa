import { Hero } from "@/app/_components/sections/hero";
import { About } from "@/app/_components/sections/about";
import { Services } from "@/app/_components/sections/services";
import { Faq } from "@/app/_components/sections/faq";
import { Contact } from "@/app/_components/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Faq />
      <Contact />
    </main>
  );
}
