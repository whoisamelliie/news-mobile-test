export type Article = {
  id: string;
  title: string;
  description: string | null;
  publishedAt: string;
  url: string;
  urlToImage: string | null;
  author: string | null;
  content: string | null;
};
