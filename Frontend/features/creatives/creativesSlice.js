import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    creatives: []
};

export const creativesSlice = createSlice({
    name: 'creatives',
    initialState,
    reducers: {
        setCreativesAction: (state, action) => {
            // Set the state to the data from the action
            return action.payload;
        },
    }
});

// Export actions to be used in components
export const { setCreativesAction } = creativesSlice.actions;

// Export the reducer to be included in the store
export default creativesSlice.reducer;