"use client";

import { MessageCircle, Linkedin, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência!");
    } catch (err) {
      toast.error("Não foi possível copiar o link.");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-foreground">
        Compartilhar:
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {/* WhatsApp */}
        <Button
          asChild
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700 border-none"
        >
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessageCircle className="size-4" />
            <span>WhatsApp</span>
          </a>
        </Button>

        {/* LinkedIn */}
        <Button
          asChild
          size="sm"
          className="bg-blue-700 text-white hover:bg-blue-800 border-none"
        >
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Linkedin className="size-4" />
            <span>LinkedIn</span>
          </a>
        </Button>

        {/* Copiar Link */}
        <Button
          variant="secondary"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700 border-none"
        >
          <Link2 className="size-4" />
          <span>Copiar Link</span>
        </Button>
      </div>
    </div>
  );
}
