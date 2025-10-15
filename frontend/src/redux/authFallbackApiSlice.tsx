import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type rolesType={
    userId:number,
    admin:boolean,
    manager:boolean,
    customer:boolean
}
type getUserResponseType={
    name:string,
    email:string,
    accessToken:string,
    roles:rolesType
}
type response={

    statusCode:number,
   success:boolean,
   message:string,
   payload?:object

}

export const authFallbackApiSlice = createApi({
    reducerPath: 'authFallbackApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3001/api/auth` }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<getUserResponseType, string>({
            query: (token) => ({
                url: `/fallback?token=${token}`,
                method: "GET",
            }),
            keepUnusedDataFor:0,
        }),
        RegisterEmployee:builder.mutation<response,string>({
            query:(token)=>({
                url:`/EmployeeRegisterFallback?token=${token}`,
                method:'POST',
                
            })
        })
    })
})

export const { useGetUserQuery,useRegisterEmployeeMutation } =authFallbackApiSlice

