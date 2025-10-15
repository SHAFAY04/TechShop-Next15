import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type loginBody={
    email:string,
    destination:string
}
type rolesType={
    admin:boolean,
    manager:boolean,
    customer:boolean
}
type registerBody={
    email:string,
    roles:rolesType
}

type EmployeeregisterBody={
    email:string,
    adminName:string,
    adminEmail:string,
    roles:rolesType
}

type authMailResponse={

    success:boolean,
    message:string,
}



export const sendAuthMailApiSlice=createApi({
    reducerPath:'sendAuthMailApiSlice',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3001/api/auth'}),
    endpoints:(builder)=> ({
        sendAuthMail: builder.mutation<authMailResponse,loginBody>({
            query: (body:loginBody) => ({
                url:`/login?redirect=${body.destination}`,
                method:"POST",
                body
            })
            
        }),
        sendEmployeeRegisterMail:builder.mutation<authMailResponse,EmployeeregisterBody>({
            query:(body:registerBody)=>({
                url:'/register-manager',
                method:'POST',
                body
            })
        }),
        sendCustomerRegisterMail:builder.mutation<authMailResponse,registerBody>({
            query:(body:registerBody)=>({
                url:'/register',
                method:'POST',
                body
            })
        }),
    }),
})



export const{useSendAuthMailMutation,useSendEmployeeRegisterMailMutation,useSendCustomerRegisterMailMutation}=sendAuthMailApiSlice