import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserAction: (state, action) => {
      // Set the state to the data from the action
      return {
        loading: action.payload.loading,
        user: action.payload.user
      };
    },
  }
});

// Export actions to be used in components
export const { setAuthUserAction } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;