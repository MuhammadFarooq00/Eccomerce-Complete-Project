import { createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoriesResponse, DeleteProductResponse, MessageResponse, NewProductResponse, ProductsDetails, SearchproductsRequest, SearchproductsResponse, UpdateProductResponse } from "../../types/api-types";
// import { Product } from "../../types/types";
// import { Product } from "../../types/types";

const server = "http://localhost:3000";

// export const Products = createApi({
//     reducerPath: "productApi",
//     baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/product/`,}),
//     endpoints: (builder) => ({
        // product: (builder.mutation<MessageResponse,Product>({
        //     query: (product) =>({
        //         url: "new",
        //         method: "POST",
        //         body: product
        //     }),
//         })),
//     }),
// })


export const ProductsApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/product/`,}),
    tagTypes:["product"],
    endpoints: (builder) => ({
        Latestproducts: builder.query<AllProductResponse,string>({query: ()=> "latest", providesTags:["product"]}),
        Allproducts: builder.query<AllProductResponse,string>({query: (_id)=> `admin-products?id=${_id}`,providesTags:["product"]}),
        Categories: builder.query<CategoriesResponse,string>({query: ()=> `categories`,providesTags:["product"]}),
        Searchproducts: builder.query<SearchproductsResponse,SearchproductsRequest>({
        query: ({price,search,sort,category,page})=> {
            let base = `all?search=${search}&page=${page}`;
            if(price) base += `&price=${price}`;
            if(sort) base += `&sort=${sort}`;
            if(category) base += `&category=${category}`;

            return base;
        },providesTags:["product"]}),
        Newproduct: builder.mutation<MessageResponse,NewProductResponse>({
            query: ({formData,_id}) =>({
                url: `new?id=${_id}`,
                method: "POST",
                body: formData
            }),invalidatesTags:["product"]
         }),
        ProductsDetails: builder.query<ProductsDetails,string>({query: (_id)=> _id, providesTags:["product"]}),
        Updateproduct: builder.mutation<MessageResponse,UpdateProductResponse>({
            query: ({formData,_id,userID}) =>({
                url: `${_id}?id=${userID}`,
                method: "PUT",
                body: formData
            }),invalidatesTags:["product"]
         }),
         Deleteproduct: builder.mutation<MessageResponse,DeleteProductResponse>({
            query: ({_id,userID}) =>({
                url: `${_id}?id=${userID}`,
                method: "DELETE",
            }),invalidatesTags:["product"]
         }),
    }),
    
})



export const { useLatestproductsQuery, useAllproductsQuery,useCategoriesQuery, useSearchproductsQuery,useNewproductMutation,useProductsDetailsQuery,useUpdateproductMutation,useDeleteproductMutation } = ProductsApi;