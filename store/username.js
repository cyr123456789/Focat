import { createSlice } from '@reduxjs/toolkit';

export const usernameSlice = createSlice({
  name: 'username',
  initialState: {
    username: 'Guest',
  },
  reducers: {
    changeUsername: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const { changeUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
