import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const getIngredients = createAsyncThunk(
  'getIngredients',
  getIngredientsApi
);

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
