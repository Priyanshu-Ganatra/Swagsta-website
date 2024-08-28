import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserAction: (state, action) => {
      // Set the state to the data from the action
      return action.payload;
    },
  }
});

// Export actions to be used in components
export const { setAuthUserAction } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;