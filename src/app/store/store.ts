import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../features/favorites/model/favoritesSlice';
import { baseApi } from '../../shared/api/baseApi'; // ВАЖНО: baseApi

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
