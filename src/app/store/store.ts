import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../features/favorites/model/favoritesSlice';
import { articlesApi } from '../../entities/article/api/articlesApi';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,

    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
