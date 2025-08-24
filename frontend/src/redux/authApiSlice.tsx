import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type loginBody={
    email:string,
    destination:string
}

type loginResponse={

    success:boolean,
    message:string,
}



const authApiSlice=createApi({
    reducerPath:'authApiSlice',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3003'}),
    endpoints:(builder)=> ({
        sendAuthMail: builder.mutation<loginResponse,loginBody>({
            query: (body:loginBody) => ({
                url:`/auth?redirect=${body.destination}`,
                method:"POST",
                body
            })
            
        })
    }),
})


export const authApiSliceReducer=authApiSlice.reducer
export const authApiSliceMiddleware=authApiSlice.middleware
export const{useSendAuthMailMutation}=authApiSlice