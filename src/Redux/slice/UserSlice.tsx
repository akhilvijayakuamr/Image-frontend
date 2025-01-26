import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../../Interface/AuthInterface";

// Initialize State
const initialState: authState = {
  userLogin: false,
  email: '',
  userId: '',
  access: null,
  refresh: null,
};

// Create authSlice

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUserLogin: (
      state,
      action: PayloadAction<{ userId: string; email: string; access: string; refresh: string}>
    ) => {
      state.userLogin = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh
    },

    userLogout:(state) =>{
      state.userLogin = false;
      state.userId = '';
      state.email = '';
      state.access = null;
      state.refresh = null;
  },

  setAccessToken: (state, action: PayloadAction<{ access: string, refresh: string }>) => {
    console.log(action.payload.access,"-----------------and----------------", action.payload.refresh)
    state.access = action.payload.access;
    state.refresh = action.payload.refresh;
  },
  },
});


export const { setUserLogin,userLogout, setAccessToken  } = authSlice.actions;
export default authSlice.reducer;