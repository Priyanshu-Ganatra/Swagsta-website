import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    caseStudyProjects: []
};

export const caseStudyProjectsSlice = createSlice({
    name: 'caseStudyProjects',
    initialState,
    reducers: {
        setCaseStudyProjectsAction: (state, action) => {
            // Set the state to the data from the action
            return action.payload;
        },
    }
});

// Export actions to be used in components
export const { setCaseStudyProjectsAction } = caseStudyProjectsSlice.actions;

// Export the reducer to be included in the store
export default caseStudyProjectsSlice.reducer;