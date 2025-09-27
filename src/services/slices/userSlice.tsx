import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserSlice = { user: TUser; isAuthChecked: boolean; isLoading: boolean };

const initialState: TUserSlice = {
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: true,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.user = {
        name: '',
        email: ''
      };
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      setCookie('accessToken', action.payload.accessToken);
      state.user = action.payload.user;
      getUser();
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      setCookie('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      state.user = {
        name: '',
        email: ''
      };
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const getUser = createAsyncThunk('getUser', getUserApi);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>) => {
    const result = updateUserApi(data);
    return result;
  }
);
export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData) => {
    const result = loginUserApi(data);
    return result;
  }
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) => {
    const result = registerUserApi(data);
    return result;
  }
);

export const logoutUser = createAsyncThunk('logoutUser', logoutApi);

export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
