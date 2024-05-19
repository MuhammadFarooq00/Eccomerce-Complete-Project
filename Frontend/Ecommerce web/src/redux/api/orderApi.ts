import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllordersResponse,
  MessageResponse,
  NewOderItemRequest,
  OrderdetailsResponse,
  UpdateOrderResquest,
} from "../../types/api-types";

const server = "http://localhost:3000";
export const OrderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/order/` }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOderItemRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    OrderUpdate: builder.mutation<MessageResponse, UpdateOrderResquest>({
      query: ({ userID, orderID }) => ({
        url: `${orderID}?id=${userID}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    DeleteOrder: builder.mutation<MessageResponse, UpdateOrderResquest>({
      query: ({ userID, orderID }) => ({
        url: `${orderID}?id=${userID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllordersResponse, string>({
      query: (_id) => `my?id=${_id}`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<AllordersResponse, string>({
      query: (_id) => `all?id=${_id}`,
      providesTags: ["orders"],
    }),
    odersDetails: builder.query<OrderdetailsResponse, string>({
      query: (_id) => _id,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useOrderUpdateMutation,
  useOdersDetailsQuery
} = OrderApi;
