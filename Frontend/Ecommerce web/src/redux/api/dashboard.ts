import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";


const server = "http://localhost:3000";
export const DashboardApi = createApi({
    reducerPath: "DashboardApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/admindashboard/`}),
    endpoints: (builder)=>({
       stats: builder.query<StatsResponse,string>({
        query:((id)=>`stat/?id=${id}`),
        keepUnusedDataFor: 0,
       }),
       pie: builder.query<PieResponse,string>({
        query:((id)=>`pie/?id=${id}`),
        keepUnusedDataFor: 0,
       }),
       bar: builder.query<BarResponse,string>({
        query:((id)=>`bar/?id=${id}`),
        keepUnusedDataFor: 0,
       }),
       line: builder.query<LineResponse,string>({
        query:((id)=>`line/?id=${id}`),
        keepUnusedDataFor: 0,
       }),
    })
});



export const {useStatsQuery,usePieQuery,useBarQuery,useLineQuery} = DashboardApi;