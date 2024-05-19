/* eslint-disable no-useless-catch */
import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import { TypedUseMutation } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

const server = "http://localhost:3000";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/user/`}),
    tagTypes:["users"],
    endpoints: (builder) =>({
        login: builder.mutation<MessageResponse, User>({
            query: (user)=>({
            url: "new",
            method: "POST",
            body: user,
           }),
           invalidatesTags:["users"],
        }),

        deleteuser: builder.mutation<MessageResponse, DeleteUserRequest>({
            query: ({userId, adminUserId})=>({
            url: `${userId}?id=${adminUserId}`,
            method: "DELETE",
           }),
           invalidatesTags:["users"],
        }),

        allusers: builder.query<AllUsersResponse,string>({
            query: (id)=>`all?id=${id}`,
            providesTags: ["users"],
        })

    // lol: builder.query({query:()=>"new2"})  <==> it is used in case of query passing
    }),
});

export const getUser = async (id:string)=>{
   try{
    const {data} = await axios.get(`${server}/api/v1/user/${id}`);
    console.log(data)
    return data;
   } catch(error) {
    throw error;
   }
};

export const {useLoginMutation,useDeleteuserMutation,useAllusersQuery} = userApi;

