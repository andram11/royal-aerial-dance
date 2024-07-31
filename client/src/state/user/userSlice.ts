import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import { User} from '../../types/types'
import { registerUser, loginUser, LoginResponse, SignUpResponse } from '../../api/api-service'
import { RootState } from '../store';


export interface AuthenticatedUser {
    id: string;
    username: string;
  }
  
  export interface UserState {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }

  const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  // Async thunk for user login
export const logUser = createAsyncThunk(
    'user/login',
  async (userData: User, thunkAPI) => {
    try {
  
      const data: LoginResponse = await loginUser(userData);
   
      return { id: data.data.userId, email: data.data.username };
      
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

  // Async thunk for user registration
  export const signUpUser = createAsyncThunk(
    'user/register',
  async (userData: User, thunkAPI) => {
    try {
  
      const data: SignUpResponse = await registerUser(userData);

      return { id: data.data.userId, email: data.data.username };
      
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(logUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(logUser.fulfilled, (state, action: PayloadAction<AuthenticatedUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
          })
          .addCase(logUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
          })
      
    }
})

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
export default userSlice.reducer;