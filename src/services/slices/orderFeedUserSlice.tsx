import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type TOrderFeedUserSlice = {
  ordersUser: TOrder[];
  isLoading: boolean;
  orderUserModal: TOrder | null;
};

const initialState: TOrderFeedUserSlice = {
  ordersUser: [],
  isLoading: false,
  orderUserModal: null
};

export const orderFeedUserSlice = createSlice({
  name: 'orderFeedUser',
  initialState,
  reducers: {
    removeOrdersUser(state) {
      state.ordersUser = [];
    }
  },
  selectors: {
    selectOrdersUser: (state) => state.ordersUser,
    selectOrderUserModal: (state) => state.orderUserModal
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ordersUser = action.payload;
    });
    builder.addCase(getOrdersUser.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const getOrdersUser = createAsyncThunk('getOrdersUser', getOrdersApi);

export const { selectOrdersUser, selectOrderUserModal } =
  orderFeedUserSlice.selectors;
export const { removeOrdersUser } = orderFeedUserSlice.actions;
