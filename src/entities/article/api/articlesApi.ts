import { baseApi } from '../../../shared/api/baseApi';
import type { Article } from '../model/types';

type GetArticlesArgs = {
  page: number;
  pageSize: number;
  query?: string;
};

const mockArticles: Article[] = [
  {
    id: 'https://example.com/1',
    title: 'Mock: First news title',
    description: 'Mock: short description for the first news',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/1',
    urlToImage: null,
    author: 'Mock Author',
    content: 'Mock: full content text...',
  },
  {
    id: 'https://example.com/2',
    title: 'Mock: Second news title',
    description: 'Mock: short description for the second news',
    publishedAt: new Date().toISOString(),
    url: 'https://example.com/2',
    urlToImage: null,
    author: null,
    content: 'Mock: full content text...',
  },
];

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], GetArticlesArgs>({
      queryFn: async ({ page, pageSize, query }) => {
        const q = (query ?? '').toLowerCase().trim();

        const filtered = q
          ? mockArticles.filter((a) => a.title.toLowerCase().includes(q))
          : mockArticles;

        const start = (page - 1) * pageSize;
        const slice = filtered.slice(start, start + pageSize);

        return { data: slice };
      },
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
