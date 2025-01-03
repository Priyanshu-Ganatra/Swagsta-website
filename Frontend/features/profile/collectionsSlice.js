import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    collections: []
};

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCollectionsAction: (state, action) => {
            // Set the state to the data from the action
            return {
                loading: action.payload.loading,
                collections: action.payload.collections
            };
        },
        setAddCollectionAction: (state, action) => {
            // Add the new collection to the state
            return {
                loading: false,
                collections: [...state.collections, action.payload]
            };
        },
        setRemoveCollectionAction: (state, action) => {
            // Remove the collection from the state
            return {
                loading: false,
                collections: state.collections.filter(collection => collection._id !== action.payload)
            };
        }
    }
});

// Export actions to be used in components
export const { setCollectionsAction, setAddCollectionAction, setRemoveCollectionAction } = collectionsSlice.actions;

// Export the reducer to be included in the store
export default collectionsSlice.reducer;