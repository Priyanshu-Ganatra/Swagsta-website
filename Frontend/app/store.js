import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit"
import projectsReducer from '../features/projects/projectsSlice';
import authReducer from '../features/auth/authSlice';
import creativesReducer from '../features/creatives/creativesSlice';
import caseStudyProjectsReducer from '../features/caseStudyProjects/caseStudySlice';

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    creatives: creativesReducer,
    caseStudyProjects: caseStudyProjectsReducer
})

export const store = configureStore({
    reducer: rootReducer
});
