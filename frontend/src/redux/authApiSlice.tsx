import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type loginBody={
    email:string,
    destination:string
}

type loginResponse={

    success:boolean,
    message:string,
}



export const sendAuthMailApiSlice=createApi({
    reducerPath:'sendAuthMailApiSlice',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3003'}),
    endpoints:(builder)=> ({
        sendAuthMail: builder.mutation<loginResponse,loginBody>({
            query: (body:loginBody) => ({
                url:`/auth/login?redirect=${body.destination}`,
                method:"POST",
                body
            })
            
        })
    }),
})



export const{useSendAuthMailMutation}=sendAuthMailApiSlice