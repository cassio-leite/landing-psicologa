import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostMetadata } from "@/app/_types/blog";

const postsDirectory = path.join(process.cwd(), "content/posts");

/**
 * Normaliza uma string para busca: remove acentos e converte para minúsculas.
 */
function normalizeForSearch(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const metadata = data as PostMetadata;
      
      const stats = readingTime(content);

      return {
        slug,
        ...metadata,
        readingTime: stats.text,
        content,
      };
    });

  // Ordenar por data (mais recente primeiro)
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCategoriesWithCount(): { name: string; count: number }[] {
  const allPosts = getAllPosts();
  const categoryCounts = allPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function searchPosts(query: string): Post[] {
  const normalizedQuery = normalizeForSearch(query);
  const allPosts = getAllPosts();

  if (!normalizedQuery) {
    return allPosts;
  }

  return allPosts.filter((post) => {
    const searchableContent = [
      post.title,
      post.description,
      post.category,
      ...(post.tags || []),
    ]
      .map(normalizeForSearch)
      .join(" ");

    return searchableContent.includes(normalizedQuery);
  });
}

export function getPaginatedPosts(
  page: number = 1,
  limit: number = 6,
  category?: string,
  search?: string
): { posts: Post[]; totalPages: number; totalPosts: number } {
  // Aplicar busca primeiro se houver
  let filteredPosts = search ? searchPosts(search) : getAllPosts();

  // Aplicar filtro de categoria se houver e não for "Todos"
  if (category && category !== "Todos") {
    const normalizedCategory = normalizeForSearch(category);
    filteredPosts = filteredPosts.filter(
      (post) => normalizeForSearch(post.category) === normalizedCategory
    );
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const posts = filteredPosts.slice(startIndex, startIndex + limit);

  return { posts, totalPages, totalPosts };
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const metadata = data as PostMetadata;
    const stats = readingTime(content);

    return {
      slug,
      ...metadata,
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    console.error(`Erro ao buscar post por slug ${slug}:`, error);
    return null;
  }
}
