
import { sendAuthMailApiSlice } from '@/redux/authApiSlice'
import { authFallbackApiSlice } from '@/redux/authFallbackApiSlice'
import { authSliceReducer } from '@/redux/authSlice'
import {configureStore} from '@reduxjs/toolkit'
export const store= configureStore({

    reducer:{
        "auth":authSliceReducer,
        "sendAuthMailApiSlice":sendAuthMailApiSlice.reducer,
        "authFallbackApiSlice": authFallbackApiSlice.reducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }).concat(
            sendAuthMailApiSlice.middleware,
            authFallbackApiSlice.middleware
        )as any,
    
})

export type storeDispatch= typeof store.dispatch
export type rootState= ReturnType<typeof store.getState>
