import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type roles={
    userId:number|null,
    admin:boolean,
    manager:boolean,
    customer:boolean
}
type AuthState={
    name:string|null,
    email:string|null,
    accessToken:string|null,
    roles:roles
}

type loginPayload={
    name:string,
    email:string,
    accessToken:string,
    roles:roles
}
const initialState:AuthState={
        name:null,
        email:null,
        accessToken:null,
        roles:{
            userId:null,
            admin:false,
            manager:false,
            customer:false
        }
    }

export const authSlice=createSlice({

    name:'auth',
    initialState,
    reducers:{

        setUserState:(state,action:PayloadAction<loginPayload>)=>{
            state.name=action.payload.name,
            state.email=action.payload.email,
            state.accessToken=action.payload.accessToken,
            state.roles=action.payload.roles
        },
        clearUserState:(state)=>{

            state.accessToken=null,
            state.email=null,
            state.roles={
                userId:null,
                admin:false,
                manager:false,
                customer:false
            },
            state.name=null
        }
    }
})

export const authState=authSlice.selectors
export const authSliceReducer=authSlice.reducer
export const {setUserState,clearUserState}=authSlice.actions
