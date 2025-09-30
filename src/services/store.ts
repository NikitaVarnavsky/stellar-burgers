import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
// import { stellarBurgerSlice } from '../services/slices/stellarBurgersSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructor';
import { orderFeedSlice } from './slices/orderFeedSlice';
import { userSlice } from './slices/userSlice';
import { orderFeedUserSlice } from './slices/orderFeedUserSlice';

// const rootReducer = () => {}

// const rootReducer = () => {
//   stellarBurger: stellarBurgerSlice;
// }; // Заменить на импорт настоящего редьюсера

const rootReducer = combineSlices(
  // stellarBurgerSlice,
  ingredientsSlice,
  burgerConstructorSlice,
  orderFeedSlice,
  userSlice,
  orderFeedUserSlice
);

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// const store = configureStore({
//   reducer: {
//     stellarBurger: stellarBurgerSlice
//     // ingredients: ingredientsSlice
//   },
//   devTools: process.env.NODE_ENV !== 'production'
// });

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

// export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
