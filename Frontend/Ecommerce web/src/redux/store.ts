import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./api/userapi";
import { userReducer } from "./reducer/userReducer";
import { ProductsApi } from "./api/productapi";
import { cartReducer } from "./reducer/cartreducer";
import { OrderApi } from "./api/orderApi";
import { DashboardApi } from "./api/dashboard";

 export const store = configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
        [ProductsApi.reducerPath]: ProductsApi.reducer,
        [OrderApi.reducerPath]: OrderApi.reducer,
        [DashboardApi.reducerPath]: DashboardApi.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (mid)=> mid().concat(userApi.middleware,ProductsApi.middleware,OrderApi.middleware,DashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>