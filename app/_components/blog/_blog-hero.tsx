"use client";

import React from "react";

export function BlogHero() {
  return (
    <div className="relative h-[350px] w-full overflow-hidden bg-gradient-to-r from-[#8b6f47] via-[#a08560] to-[#b59c78] md:h-[500px]">
      {/* Overlay sutil para melhorar contraste */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 md:px-8">
        <h1 className="mb-6 text-center font-serif text-4xl font-bold text-white drop-shadow-xl md:text-5xl lg:text-7xl">
          Blog da Psicóloga
        </h1>
        <p className="max-w-2xl text-center text-lg text-white/90 drop-shadow-md md:text-xl">
          Artigos sobre saúde mental, terapia e bem-estar emocional para te ajudar no caminho do autoconhecimento.
        </p>
      </div>

      {/* Wave SVG vibrante e visível na base */}
      <svg
        className="absolute bottom-0 left-0 h-24 w-full md:h-32 lg:h-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          className="text-background"
          fillOpacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}
