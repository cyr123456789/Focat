import { configureStore } from '@reduxjs/toolkit';

import usernameReducer from './username';

export const store = configureStore({
  reducer: {
    username: usernameReducer,
  },
});
