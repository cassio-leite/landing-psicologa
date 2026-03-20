"use client";

import { User, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Post } from "@/app/_types/blog";
import { CategoryBadge } from "@/app/_components/blog/_category-badge";

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12 border-b border-border pb-12">
      <div className="mb-6">
        <CategoryBadge category={post.category} size="md" />
      </div>

      <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
        {post.title}
      </h1>

      <p className="mb-8 text-xl leading-relaxed text-muted-foreground md:text-2xl">
        {post.description}
      </p>

      <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="size-4 text-primary" />
          <span className="font-medium text-foreground">{post.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          <time dateTime={post.date}>
            {format(new Date(post.date), "d 'de' MMMM, yyyy", {
              locale: ptBR,
            })}
          </time>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <span>{post.readingTime}</span>
        </div>
      </div>
    </header>
  );
}
