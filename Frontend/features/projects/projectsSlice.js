import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  projects: []
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsAction: (state, action) => {
      // Set the state to the data from the action
      return action.payload;
    },
  }
});

// Export actions to be used in components
export const { setProjectsAction } = projectsSlice.actions;

// Export the reducer to be included in the store
export default projectsSlice.reducer;