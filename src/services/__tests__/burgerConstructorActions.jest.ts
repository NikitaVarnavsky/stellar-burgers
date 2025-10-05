import { describe, jest, test } from '@jest/globals';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  addItem,
  burgerConstructorSlice,
  ingredientDown,
  ingredientUp,
  removeIngredient,
  selectConstructorItems
} from '../slices/burgerConstructor';
import { mockIngredient, mockStore } from '../mockData';

describe('burgerConstructorSlice', () => {
  const createStore = (initialState = {}) => {
    const rootReducer = combineSlices(burgerConstructorSlice);
    return configureStore({
      reducer: rootReducer as any,
      preloadedState: {
        [burgerConstructorSlice.name]: initialState
      }
    });
  };

  test('rootReducer undefined', () => {
    const rootReducer = combineSlices(burgerConstructorSlice);

    const resultState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(resultState).toEqual({
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState()
    });
  });

  test('addItem', () => {
    const store = createStore(mockStore);
    const constructorItemsBefore = selectConstructorItems(store.getState());
    const itemsBefore = constructorItemsBefore.ingredients.length;
    store.dispatch(addItem(mockIngredient));
    const constructorItemsAfter = selectConstructorItems(store.getState());
    const itemsAfter = constructorItemsAfter.ingredients.length;
    expect(itemsBefore).toBe(2);
    expect(itemsAfter).toBe(3);
  });
  test('removeIngredient', () => {
    const store = createStore(mockStore);
    const constructorItemsBefore = selectConstructorItems(store.getState());
    const itemsBefore = constructorItemsBefore.ingredients.length;
    store.dispatch(removeIngredient(mockIngredient));
    const constructorItemsAfter = selectConstructorItems(store.getState());
    const itemsAfter = constructorItemsAfter.ingredients.length;
    expect(itemsBefore).toBe(2);
    expect(itemsAfter).toBe(1);
  });
  test('ingredientUp', () => {
    const store = createStore(mockStore);
    const constructorItemsBefore = selectConstructorItems(store.getState());
    const lastItem =
      constructorItemsBefore.ingredients[
        constructorItemsBefore.ingredients.length - 1
      ];
    store.dispatch(ingredientUp(lastItem));
    const constructorItemsAfter = selectConstructorItems(store.getState());
    const moveUpLastItem =
      constructorItemsAfter.ingredients[
        constructorItemsAfter.ingredients.length - 2
      ];
    expect(moveUpLastItem).toEqual(lastItem);
  });
  test('ingredientDown', () => {
    const store = createStore(mockStore);
    const constructorItemsBefore = selectConstructorItems(store.getState());
    const firstItem = constructorItemsBefore.ingredients[0];
    store.dispatch(ingredientDown(firstItem));
    const constructorItemsAfter = selectConstructorItems(store.getState());
    const moveDownFirstItem = constructorItemsAfter.ingredients[1];
    expect(firstItem).toEqual(moveDownFirstItem);
  });
});
