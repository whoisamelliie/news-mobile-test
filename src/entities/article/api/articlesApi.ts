import { baseApi } from '../../../shared/api/baseApi';
import type { Article } from '../model/types';

type GetArticlesArgs = {
  page: number;
  pageSize: number;
  query?: string;
};

const mockArticles: Article[] = [
  {
    id: 'https://apnews.com/article/74d20c39cb436b76878354decddad575',
    title:
      'Paris 2024: организаторы заявили о заметно меньших выбросах CO₂, чем у прошлых Игр',
    description:
      'По данным организаторов, углеродный след Парижа-2024 оказался существенно ниже Лондона-2012 и Рио-2016 — за счёт минимизации строительства и других мер.',
    publishedAt: '2024-11-01T10:00:00.000Z',
    url: 'https://apnews.com/article/74d20c39cb436b76878354decddad575',
    urlToImage: null,
    author: 'AP News',
    content:
      'Короткий пересказ: организаторы подвели экологические итоги и объяснили, какие решения сильнее всего повлияли на снижение выбросов.',
  },
  {
    id: 'https://www.lemonde.fr/en/sports/article/2024/03/20/paris-2024-russian-and-belarusian-athletes-banned-from-olympic-games-opening-ceremony_6637140_9.html',
    title:
      'Paris 2024: решение IOC по церемонии открытия для российских и белорусских спортсменов',
    description:
      'Материал о решении МОК по участию российских и белорусских атлетов в церемонии открытия и правилах нейтрального статуса.',
    publishedAt: '2024-03-20T12:00:00.000Z',
    url: 'https://www.lemonde.fr/en/sports/article/2024/03/20/paris-2024-russian-and-belarusian-athletes-banned-from-olympic-games-opening-ceremony_6637140_9.html',
    urlToImage: null,
    author: 'Le Monde',
    content:
      'Короткий пересказ: что именно объявили в МОК и как это влияет на протокол участия спортсменов.',
  },
  {
    id: 'https://olympics.com/en/olympic-games/milano-cortina-2026',
    title:
      'Milano Cortina 2026: что важно знать про зимние Олимпийские игры в Италии',
    description:
      'Страница Игр: базовая информация о Milano Cortina 2026 (формат, локации, общие сведения и обновления на официальном сайте).',
    publishedAt: '2026-02-01T09:00:00.000Z',
    url: 'https://olympics.com/en/olympic-games/milano-cortina-2026',
    urlToImage: null,
    author: 'Olympics.com',
    content:
      'Короткий пересказ: официальный хаб по Milano Cortina 2026 — удобно использовать как “источник правды” в приложении.',
  },
  {
    id: 'https://olympics.com/en/olympic-games/los-angeles-2028',
    title: 'Los Angeles 2028: официальный обзор предстоящей Олимпиады',
    description:
      'Официальная страница LA28: ключевые сведения об Играх 2028 года и связанные материалы на Olympics.com.',
    publishedAt: '2025-06-01T09:00:00.000Z',
    url: 'https://olympics.com/en/olympic-games/los-angeles-2028',
    urlToImage: null,
    author: 'Olympics.com',
    content:
      'Короткий пересказ: основные факты про LA28 и удобные ссылки на разделы с обновлениями.',
  },
  {
    id: 'https://olympics.com/en/olympic-games/brisbane-2032',
    title: 'Brisbane 2032: официальный обзор Олимпийских игр в Австралии',
    description:
      'Официальная страница Игр 2032 года: базовая информация и навигация по материалам Brisbane 2032 на Olympics.com.',
    publishedAt: '2025-06-01T09:00:00.000Z',
    url: 'https://olympics.com/en/olympic-games/brisbane-2032',
    urlToImage: null,
    author: 'Olympics.com',
    content:
      'Короткий пересказ: единая точка входа по Brisbane 2032 с официальными обновлениями.',
  },
  {
    id: 'https://olympics.com/en/news/brisbane-2032-olympic-games-venues-what-we-know-so-far',
    title: 'Brisbane 2032: что известно о площадках (venues) на данный момент',
    description:
      'Подборка/обзор по объектам Brisbane 2032: какие площадки обсуждаются и что уже подтверждено (в формате “what we know so far”).',
    publishedAt: '2024-04-16T08:00:00.000Z',
    url: 'https://olympics.com/en/news/brisbane-2032-olympic-games-venues-what-we-know-so-far',
    urlToImage: null,
    author: 'Olympics.com',
    content:
      'Короткий пересказ: сводка по площадкам Brisbane 2032 — удобно для “карточки новости” в приложении.',
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
