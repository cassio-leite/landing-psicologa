export interface PostMetadata {
  title: string;
  description: string;
  date: string; // ISO format (YYYY-MM-DD)
  author: string;
  category: string;
  tags: string[];
  image: string;
}

export interface Post extends PostMetadata {
  slug: string;
  readingTime: string;
  content: string;
}
