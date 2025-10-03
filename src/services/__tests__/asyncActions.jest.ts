import { describe, jest, test } from '@jest/globals';
import {
  addNewOrder,
  burgerConstructorSlice
} from '../slices/burgerConstructor';
import {
  userSlice,
  getUser,
  updateUser,
  loginUser,
  registerUser,
  logoutUser
} from '../slices/userSlice';
import { getIngredients, ingredientsSlice } from '../slices/ingredientsSlice';
import { getFeeds, orderFeedSlice } from '../slices/orderFeedSlice';
import {
  getOrdersUser,
  orderFeedUserSlice
} from '../slices/orderFeedUserSlice';
import exp from 'constants';

describe('userSlice', () => {
  const initialState = {
    user: {
      name: '',
      email: ''
    },
    isAuthChecked: true,
    isLoading: false
  };

  describe('getUser', () => {
    test('getUser pending', () => {
      const action = { type: getUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.isAuthChecked).toBe(false);
    });
    test('getUser fulfilled', () => {
      const mockResponse = {
        user: { name: 'test', email: 'test@mail.ru' }
      };
      const action = { type: getUser.fulfilled.type, payload: mockResponse };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockResponse.user);
    });
    test('getUser rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('updateUser', () => {
    test('updateUser pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('updateUser fulfilled', () => {
      const mockResponse = {
        user: { name: 'user', email: 'user@mail.ru' }
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockResponse
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockResponse.user);
    });
    test('updateUser rejected', () => {
      const action = { type: updateUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('loginUser', () => {
    test('loginUser pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('loginUser fulfilled', () => {
      const mockResponse = {
        user: { name: 'user', email: 'user@mail.ru' },
        refreshToken: 'testRefreshToken',
        accessToken: 'testAccessToken'
      };
      const action = { type: loginUser.fulfilled.type, payload: mockResponse };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toBe(mockResponse.user);
    });
    test('loginUser rejected', () => {
      const action = { type: loginUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('registerUser', () => {
    test('registerUser pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('registerUser fulfilled', () => {
      const mockResponse = {
        user: { name: 'user', email: 'user@mail.ru' },
        refreshToken: 'testRefreshToken',
        accessToken: 'testAccessToken'
      };
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockResponse
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toBe(mockResponse.user);
    });
    test('registerUser rejected', () => {
      const action = { type: registerUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logoutUser', () => {
    test('logoutUser pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('logoutUser fulfilled', () => {
      const mockResponse = {
        user: { name: '', email: '' }
      };
      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockResponse.user);
    });
    test('logoutUser rejected', () => {
      const action = { type: logoutUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderUserModal: null
  };
  describe('addNewOrder', () => {
    test('addNewOrder pending', () => {
      const action = { type: addNewOrder.pending.type };
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(true);
    });
    test('addNewOrder fulfilled', () => {
      const mockResponse = {
        success: true,
        name: 'Экзо-плантаго флюоресцентный бургер',
        order: {
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa0949',
              name: 'Мини-салат Экзо-Плантаго',
              type: 'main',
              proteins: 1,
              fat: 2,
              carbohydrates: 3,
              calories: 6,
              price: 4400,
              image: 'https://code.s3.yandex.net/react/code/salad.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/salad-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/salad-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0
            }
          ],
          _id: '68de2d36673086001ba8b52d',
          owner: {
            name: 'bmbmbm',
            email: 'bmbmbm@mail.ru',
            createdAt: '2025-09-22T11:47:24.231Z',
            updatedAt: '2025-09-29T12:11:17.134Z'
          },
          status: 'done',
          name: 'Экзо-плантаго флюоресцентный бургер',
          createdAt: '2025-10-02T07:43:50.686Z',
          updatedAt: '2025-10-02T07:43:51.985Z',
          number: 90154,
          price: 6376
        }
      };
      const action = {
        type: addNewOrder.fulfilled.type,
        payload: mockResponse
      };
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state.orderUserModal).toEqual(mockResponse.order);
      expect(state.orderRequest).toBe(false);
    });
    test('addNewOrder rejected', () => {
      const action = { type: addNewOrder.rejected.type };
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state.orderRequest).toBe(false);
    });
  });
});

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false
  };
  describe('getIngredients', () => {
    test('getIngredients pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('getIngredients fulfilled', () => {
      const mockResponse = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      };
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockResponse
      };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.ingredients).toEqual(mockResponse);
      expect(state.isLoading).toBe(false);
    });
    test('getIngredients rejected', () => {
      const action = { type: getIngredients.rejected.type };
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});

describe('orderFeedSlice', () => {
  const initialState = {
    orders: [],
    totalOrders: 0,
    totalToday: 0,
    isLoading: false
  };
  describe('getFeeds', () => {
    test('getFeeds pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = orderFeedSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('getFeeds fulfilled', () => {
      const mockResponse = {
        success: true,
        orders: [
          {
            _id: '68de0d84673086001ba8b4f5',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0943',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Space флюоресцентный люминесцентный бургер',
            createdAt: '2025-10-02T05:28:36.120Z',
            updatedAt: '2025-10-02T05:28:37.234Z',
            number: 90143
          },
          {
            _id: '68dda651673086001ba8b488',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093f',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный бессмертный бургер',
            createdAt: '2025-10-01T22:08:17.981Z',
            updatedAt: '2025-10-01T22:08:19.397Z',
            number: 90129
          },
          {
            _id: '68dda635673086001ba8b486',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный люминесцентный био-марсианский бургер',
            createdAt: '2025-10-01T22:07:49.856Z',
            updatedAt: '2025-10-01T22:07:51.001Z',
            number: 90128
          }
        ],
        total: 89789,
        totalToday: 90
      };
      const action = { type: getFeeds.fulfilled.type, payload: mockResponse };
      const state = orderFeedSlice.reducer(initialState, action);
      expect(state.orders).toEqual(mockResponse.orders);
      expect(state.totalOrders).toEqual(mockResponse.total);
      expect(state.totalToday).toEqual(mockResponse.totalToday);
      expect(state.isLoading).toBe(false);
    });
    test('getFeeds rejected', () => {
      const action = { type: getFeeds.rejected.type };
      const state = orderFeedSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});
describe('orderFeedUserSlice', () => {
  const initialState = {
    ordersUser: [],
    isLoading: false,
    orderUserModal: null
  };
  describe('getOrdersUser', () => {
    test('getOrdersUser pending', () => {
      const action = { type: getOrdersUser.pending.type };
      const state = orderFeedUserSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('getOrdersUser fulfilled', () => {
      const mockResponse = [
        {
          _id: '68d14fb6673086001ba89441',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный бессмертный бургер',
          createdAt: '2025-09-22T13:31:34.129Z',
          updatedAt: '2025-09-22T13:31:35.314Z',
          number: 89182
        },
        {
          _id: '68d38c82673086001ba8993b',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный метеоритный бургер',
          createdAt: '2025-09-24T06:15:30.603Z',
          updatedAt: '2025-09-24T06:15:31.802Z',
          number: 89432
        },
        {
          _id: '68d3f464673086001ba89a1a',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-09-24T13:38:44.747Z',
          updatedAt: '2025-09-24T13:38:46.080Z',
          number: 89461
        }
      ];
      const action = {
        type: getOrdersUser.fulfilled.type,
        payload: mockResponse
      };
      const state = orderFeedUserSlice.reducer(initialState, action);
      expect(state.ordersUser).toEqual(mockResponse)
      expect(state.isLoading).toBe(false);
    });
    test('getOrdersUser rejected', () => {
      const action = { type: getOrdersUser.rejected.type };
      const state = orderFeedUserSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});
