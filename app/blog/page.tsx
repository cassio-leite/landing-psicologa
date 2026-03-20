import { Metadata } from "next";
import { Suspense } from "react";
import { getPaginatedPosts, getCategoriesWithCount } from "@/app/_lib/mdx";
import { PostCard } from "@/app/_components/blog/_post-card";
import { BlogHero } from "@/app/_components/blog/_blog-hero";
import { PostCardSkeleton } from "@/app/_components/blog/_post-card-skeleton";
import { CategoryFilter } from "@/app/_components/blog/_category-filter";
import { SearchBar } from "@/app/_components/blog/_search-bar";
import { ClearFilters } from "@/app/_components/blog/_clear-filters";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blog - Dra. Kailaine Leite",
  description:
    "Artigos sobre saúde mental, terapia e bem-estar emocional.",
  openGraph: {
    title: "Blog - Dra. Kailaine Leite",
    description: "Artigos sobre saúde mental, terapia e bem-estar emocional.",
    url: `${SITE_URL}/blog`,
    siteName: "Dra. Kailaine Leite - Psicóloga",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "Blog - Dra. Kailaine Leite",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Blog - Dra. Kailaine Leite",
    description: "Artigos sobre saúde mental, terapia e bem-estar emocional.",
    images: [`${SITE_URL}/images/logo.png`],
  },
};

function PostsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface PostsGridProps {
  category?: string;
  search?: string;
  page: number;
}

async function PostsGrid({ category, search, page }: PostsGridProps) {
  const { posts } = getPaginatedPosts(page, 6, category, search);

  if (posts.length === 0) {
    let emptyMessage = "Nenhum post publicado ainda. Em breve teremos conteúdo novo!";
    
    if (search && category) {
      emptyMessage = `Nenhum resultado para "${search}" na categoria "${category}".`;
    } else if (search) {
      emptyMessage = `Nenhum resultado para "${search}".`;
    } else if (category) {
      emptyMessage = `Nenhum post encontrado na categoria "${category}".`;
    }

    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default async function BlogPage(props: {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
}) {
  // Em Next.js 15+, searchParams é uma Promise que deve ser aguardada
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const search = searchParams.search;
  const page = Number(searchParams.page) || 1;

  const categories = getCategoriesWithCount();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero com subtítulo integrado */}
      <div className="-mt-20 md:-mt-24">
        <BlogHero />
      </div>

      {/* Seção Compacta de Filtros */}
      <section className="bg-background py-8">
        <div className="container mx-auto max-w-5xl px-6 md:px-8">
          <div className="flex flex-col space-y-6">
            <SearchBar />
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CategoryFilter categories={categories} />
              <ClearFilters />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Posts com Suspense */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-8">
          {/* A key forçada garante que o Suspense seja re-acionado quando os parâmetros mudam */}
          <Suspense 
            key={`${category || ''}-${search || ''}-${page}`} 
            fallback={<PostsGridSkeleton />}
          >
            <PostsGrid category={category} search={search} page={page} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
