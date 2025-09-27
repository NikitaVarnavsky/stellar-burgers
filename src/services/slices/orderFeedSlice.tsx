import { getFeedsApi, getIngredientsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type TOrderFeedSlice = {
  orders: TOrder[];
  totalOrders: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TOrderFeedSlice = {
  orders: [],
  totalOrders: 0,
  totalToday: 0,
  isLoading: false
};

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    removeOrders(state) {
      state.orders = [];
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeeds.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const getFeeds = createAsyncThunk('getFeeds', getFeedsApi);

export const { selectOrders, selectTotalOrders, selectTotalToday } =
  orderFeedSlice.selectors;

export const { removeOrders } = orderFeedSlice.actions;
