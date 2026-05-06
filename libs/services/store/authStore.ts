import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthUser } from '@infyenergy/interfaces';

export interface AuthState {
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isConsultantMode: boolean;
}

const loadInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('infyenergy_token');
    const userStr = localStorage.getItem('infyenergy_user');
    if (token && userStr) {
      const user = JSON.parse(userStr) as IAuthUser;
      return {
        user,
        token,
        isAuthenticated: true,
        isConsultantMode: localStorage.getItem('infyenergy_consultant_mode') === 'true',
      };
    }
  } catch {
    // ignore parse errors
  }
  return { user: null, token: null, isAuthenticated: false, isConsultantMode: false };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: IAuthUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('infyenergy_token', action.payload.token);
      localStorage.setItem('infyenergy_user', JSON.stringify(action.payload.user));
    },
    updateUser(state, action: PayloadAction<Partial<IAuthUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('infyenergy_user', JSON.stringify(state.user));
      }
    },
    enterConsultantMode(state) {
      state.isConsultantMode = true;
      localStorage.setItem('infyenergy_consultant_mode', 'true');
    },
    exitConsultantMode(state) {
      state.isConsultantMode = false;
      localStorage.removeItem('infyenergy_consultant_mode');
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isConsultantMode = false;
      localStorage.removeItem('infyenergy_token');
      localStorage.removeItem('infyenergy_user');
      localStorage.removeItem('infyenergy_consultant_mode');
    },
  },
});

export const { setCredentials, updateUser, logout, enterConsultantMode, exitConsultantMode } =
  authSlice.actions;
export default authSlice.reducer;
