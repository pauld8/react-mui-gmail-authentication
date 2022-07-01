import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  email: string;
  name: string;
  image: string;
}

interface AlertState {
  show: boolean;
  message: string;
}

export interface AuthState {
  user?: UserState;
  loaded: boolean;
  loggedIn: boolean;
  authCheck: boolean;
  alert: AlertState;
}

const defaultAuthState: AuthState = {
  loaded: false,
  loggedIn: false,
  authCheck: false,
  alert: {
    show: false,
    message: '',
  },
};

const auth = createSlice({
  name: 'Auth',
  initialState: defaultAuthState,
  reducers: {
    signOut: (state) => {
      state.user = undefined;
      state.loggedIn = false;
    },
    authChecked: (state) => {
      state.authCheck = true;
    },
    appLoaded: (state) => {
      state.loaded = true;
    },
    setUser: (state, action: PayloadAction<any>) => {
      const user = action.payload.user;

      console.log(user);

      const userObj = {
        email: user.getEmail(),
        image: user.getImageUrl(),
        name: user.getName(),
      };

      state.user = userObj;
      state.loggedIn = true;
    },
    showAlert: (state, action: PayloadAction<any>) => {
      state.alert = {
        show: true,
        message: action.payload,
      };
    },
    hideAlert: (state) => {
      state.alert = {
        show: false,
        message: state.alert.message,
      };
    },
  },
});

export const authActions = auth.actions;

export const authSelector = (state: RootState) => state.auth;
export const showAlert = (state: RootState) => state.auth.alert.show;
export const alertMessage = (state: RootState) => state.auth.alert.message;

export default auth.reducer;
