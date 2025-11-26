import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
  currentIngredient: TIngredient | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null,
  currentIngredient: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.currentIngredient = action.payload;
    },

    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
        state.items = [];
      });
  }
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
