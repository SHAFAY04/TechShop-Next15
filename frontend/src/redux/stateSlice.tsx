import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState={
    chatOpened:false,
    activeCarousel:1
}
type carouselPayload={
    activeCarousel:1|2|3
}

export const stateSlice=createSlice({

    name:'state',
    initialState,
    reducers:{

        setChatOpened:(state)=>{
            state.chatOpened=true
        },
        setChatClosed:(state)=>{
            state.chatOpened=false
        },
        setActiveCarousel:(state,action:PayloadAction<carouselPayload>)=>{
            state.activeCarousel=action.payload.activeCarousel
        }
    }
})

export const stateSliceReducer=stateSlice.reducer
export const {setChatOpened,setChatClosed,setActiveCarousel}=stateSlice.actions
