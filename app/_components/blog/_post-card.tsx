"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Post } from "@/app/_types/blog";
import { CategoryBadge } from "@/app/_components/blog/_category-badge";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg [transform:translateZ(0)]">
        {/* Imagem Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4">
            <CategoryBadge category={post.category} />
          </div>

          <h3 className="mb-3 line-clamp-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {format(new Date(post.date), "d 'de' MMMM, yyyy", {
                locale: ptBR,
              })}
            </time>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
