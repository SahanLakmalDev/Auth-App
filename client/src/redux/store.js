import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice'

export const store = configureStore({
    reducer: {user:userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // TODO: remove this line when we have a better solution for persisting state in the browser.
    }),
});