
import { authApiSliceMiddleware, authApiSliceReducer } from '@/redux/authApiSlice'
import { authFallbackApiSlice } from '@/redux/authFallbackApiSlice'
import { authSliceReducer } from '@/redux/authSlice'
import {configureStore} from '@reduxjs/toolkit'
export const store= configureStore({

    reducer:{
        "auth":authSliceReducer,
        "sendAuthMailApiSlice":authApiSliceReducer,
        "authFallbackApiSlice": authFallbackApiSlice.reducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }).concat(
            authApiSliceMiddleware,
            authFallbackApiSlice.middleware
        )as any,
    
})

export type storeDispatch= typeof store.dispatch
export type rootState= ReturnType<typeof store.getState>
