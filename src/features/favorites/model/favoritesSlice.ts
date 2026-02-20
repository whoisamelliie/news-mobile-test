import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Article = {
  id: string;
  title: string;
  description?: string;
  url: string;
  publishedAt: string;
};

type FavoritesState = {
  items: Article[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Article[]>) {
      state.items = action.payload;
    },

    addToFavorites(state, action: PayloadAction<Article>) {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavorites(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
