// Import libraries
import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']