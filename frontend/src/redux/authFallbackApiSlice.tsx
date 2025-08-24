import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type rolesType={
    manager:boolean,
    customer:boolean
}
type getUserResponseType={
    username:string,
    email:string,
    accessToken:string,
    roles:rolesType
}


export const authFallbackApiSlice = createApi({
    reducerPath: 'authFallbackApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3003` }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<getUserResponseType, string>({
            query: (token) => ({
                url: `/auth/fallback?token=${token}`,
                method: "GET",
            }),
            providesTags: ['User']
        })
    })
})

export const { useGetUserQuery } =authFallbackApiSlice

