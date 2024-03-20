import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import jobReducer from './features/jobs/AddJobSlice';
import allJobsReducer from './features/allJobs/allJobsSlice';

export const store = configureStore(
    {
        reducer: {
            "userState": userReducer,
            "jobState": jobReducer,
            'allJobsState': allJobsReducer
        }
    }
)
