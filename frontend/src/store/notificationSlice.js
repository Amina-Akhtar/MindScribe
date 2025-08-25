import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: "analytics",
  initialState: {
    username: null,
    postid:null,
    type:null
  },
  reducers: {
    resetNotificationState: (state) => {
      state.username = null;
      state.postid = null;
      state.type = null;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateNotification: (state,action)=>{
        state.username=action.payload.username;
        state.postid=action.payload.postid;
        state.type=action.payload.type;
    }
  },
});

export const { resetNotificationState, updateField, updateNotification } =notificationSlice.actions;
export default notificationSlice.reducer;