import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type roles={
    manager:boolean,
    customer:boolean
}
type AuthState={
    username:string|null,
    email:string|null,
    accessToken:string|null,
    roles:roles
}

type loginPayload={
    username:string,
    email:string,
    accessToken:string,
    roles:roles
}
const initialState:AuthState={
        username:null,
        email:null,
        accessToken:null,
        roles:{
            manager:false,
            customer:false
        }
    }

export const authSlice=createSlice({

    name:'auth',
    initialState,
    reducers:{

        setUserState:(state,action:PayloadAction<loginPayload>)=>{
            state.username=action.payload.username,
            state.email=action.payload.email,
            state.accessToken=action.payload.accessToken,
            state.roles=action.payload.roles

        },
        clearUserState:(state)=>{

            state.accessToken=null,
            state.email=null,
            state.roles={
                manager:false,
                customer:false
            },
            state.username=null
        }
    }
})

export const authState=authSlice.selectors
export const authSliceReducer=authSlice.reducer
export const {setUserState,clearUserState}=authSlice.actions
