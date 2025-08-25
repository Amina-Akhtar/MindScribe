import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: '',
    email: '',
    password:'',
    isSignedIn: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.username = '';
      state.email = '';
      state.password='';
      state.isSignedIn = false;
    },
    loginSuccess: (state,action) => {
      state.isSignedIn = true;
      state.username = action.payload.username;
      state.password=action.payload.password;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    }
  },
});

export const { resetUserState, loginSuccess, updateField } =userSlice.actions;
export default userSlice.reducer;