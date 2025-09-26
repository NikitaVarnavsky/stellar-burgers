import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorItems, TIngredient, TOrder } from '@utils-types';

type TBurgerConstructorSlice = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderUserModal: TOrder | null;
};

const initialState: TBurgerConstructorSlice = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderUserModal: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderUserModal = null;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    addItem(state, action: PayloadAction<TIngredient>) {
      action.payload.type === 'bun'
        ? (state.constructorItems.bun = action.payload)
        : state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<TIngredient>) {
      const selectItem = state.constructorItems.ingredients.find(
        (ingredient) => ingredient._id === action.payload._id
      );

      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item, index) => item !== selectItem
        );
    },
    ingredientUp(state, action: PayloadAction<TIngredient>) {
      const indexSelectItem = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id
      );
      const prevItem = state.constructorItems.ingredients[indexSelectItem - 1];
      state.constructorItems.ingredients.splice(
        indexSelectItem - 1,
        2,
        action.payload,
        prevItem
      );
    },
    ingredientDown(state, action: PayloadAction<TIngredient>) {
      const indexSelectItem = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id
      );
      const prevItem = state.constructorItems.ingredients[indexSelectItem + 1];
      state.constructorItems.ingredients.splice(
        indexSelectItem,
        2,
        prevItem,
        action.payload
      );
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderUserModal: (state) => state.orderUserModal
  },
  extraReducers: (builder) => {
    builder.addCase(addNewOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderUserModal = action.payload.order;
    });
    builder.addCase(addNewOrder.rejected, (state) => {
      state.orderRequest = false;
    });
  }
});

export const addNewOrder = createAsyncThunk(
  'addNewOrder',
  async (data: string[]) => {
    const result = orderBurgerApi(data);
    return result;
  }
);

export const {
  addItem,
  removeIngredient,
  ingredientUp,
  ingredientDown,
  closeOrderRequest
} = burgerConstructorSlice.actions;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderUserModal
} = burgerConstructorSlice.selectors;
