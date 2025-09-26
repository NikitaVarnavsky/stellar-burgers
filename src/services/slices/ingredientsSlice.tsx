import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSlice = {
  ingredients: TIngredient[];
  isLoading: boolean;
  // isModal: boolean;
};

const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false
  // isModal: true
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // onOpenModal(state) {
    //   state.isModal = true;
    // },
    // onCloseModal(state) {
    //   state.isModal = false;
    // }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
    // selectIsModal: (state) => state.isModal
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

export const getIngredients = createAsyncThunk('getIngredients', async () =>
  getIngredientsApi()
);

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;

// export const { onCloseModal, onOpenModal } = ingredientsSlice.actions;
