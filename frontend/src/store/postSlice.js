import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: "post",
  initialState: {
    username: null,
    text: null,
    image: null,
    likes: 0,
    dislikes: 0,
  },
  reducers: {
    resetPostState: (state) => {
      state.username = null;
      state.text = null;
      state.image = null;
      state.likes = 0;
      state.dislikes = 0;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updatePost: (state,action)=>{
        state.text=action.payload.text;
        state.image=action.payload.image;
        state.likes=action.payload.likes;
        state.dislikes=action.payload.dislikes;
    }
  },
});

export const { resetPostState, updateField, updatePost } =postSlice.actions;
export default postSlice.reducer;