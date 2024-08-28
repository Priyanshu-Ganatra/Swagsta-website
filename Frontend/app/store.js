import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit"
import creativesReducer from '../features/creatives/creativesSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    creatives: creativesReducer,
})

export const store = configureStore({
    reducer: rootReducer
});
