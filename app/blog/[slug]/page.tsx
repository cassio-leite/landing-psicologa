import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/app/_lib/mdx";
import { PostHeader } from "@/app/_components/blog/_post-header";
import { PostContent } from "@/app/_components/blog/_post-content";
import { ShareButtons } from "@/app/_components/blog/_share-buttons";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/app/_components/json-ld";

// In a real application, this would come from an environment variable
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const fullUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = `${SITE_URL}${post.image}`;

  return {
    title: `${post.title} - Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: fullUrl,
      siteName: "Dra. Kailaine Leite - Psicóloga",
      locale: "pt_BR",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6 md:px-8">
        <ArticleJsonLd
          post={{
            title: post.title,
            description: post.description,
            date: post.date,
            author: post.author,
            image: `${SITE_URL}${post.image}`,
            slug: post.slug,
          }}
        />

        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]}
        />

        <article>
          <PostHeader post={post} />

          {/* Imagem de Destaque */}
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg [transform:translate3d(0,0,0)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          <div className="mx-auto max-w-3xl">
            <PostContent content={post.content} />

            <div className="mt-12 border-t border-border pt-12">
              <ShareButtons
                title={post.title}
                url={`${SITE_URL}/blog/${post.slug}`}
              />
            </div>

            {/* CTA Final */}
            <div className="mt-16 rounded-3xl bg-primary/10 p-8 text-center md:p-12 lg:mt-24">
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Gostou do conteúdo?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
                Se você se identificou com este tema e gostaria de conversar,
                agende uma sessão. Estou aqui para te ajudar no seu processo de
                autoconhecimento.
              </p>
              <Link
                href="/#contato"
                className="inline-block rounded-full bg-[linear-gradient(-45deg,#5b4bab,#7b6ab3)] px-10 py-4 font-bold uppercase text-white shadow-md transition-all duration-300 hover:shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:[-webkit-transform:translate3d(0,-2px,0)] hover:[transform:translate3d(0,-2px,0)] [transform:translate3d(0,0,0)] [backface-visibility:hidden] [perspective:1000px] [-webkit-font-smoothing:subpixel-antialiased] subpixel-antialiased"
              >
                Agendar Consulta
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
