import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerinitailstate } from "../../types/reducer-types";
import { cartItems, shippingInfo } from "../../types/types";


const initialState:cartReducerinitailstate = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    }
}

export const cartReducer = createSlice({
    name:"cartReducer",
    initialState,
    reducers: {
      addToCart : (state,action:PayloadAction<cartItems>)=>{
         state.loading = true;
        const index = state.cartItems.findIndex((i)=>i.productID===action.payload.productID);
        if(index !== -1) state.cartItems[index] = action.payload;
        else{
            state.cartItems.push(action.payload)
            state.loading = false;
        }
         
      },
      removeCartitems: (state,action:PayloadAction<string>)=>{
        state.loading = true,
        state.cartItems = state.cartItems.filter((i)=> i.productID !== action.payload)
        state.loading = false;
     },
     calculatePrice: (state)=>{
        const subtotal = state.cartItems.reduce((total,item)=>total+(item.price*item.quantity),0);

    //    for(let i = 0; i<=state.cartItems.length; i++){
    //         const item = state.cartItems[i];
    //         subtotal += item.price*item.quantity;  
    //    }

       state.subtotal = subtotal;
       state.shippingCharges = state.subtotal > 1000? 200 : 0;
       state.tax = Math.round(state.subtotal*0.18);
       state.total = state.subtotal + state.shippingCharges + state.tax - state.discount;
     },
     discountApplied: (state,action:PayloadAction<number>)=>{
        state.discount = action.payload;
     },
     saveShippingInfo: (state, action:PayloadAction<shippingInfo>)=>{
            state.shippingInfo = action.payload;
     },
      resetCart: ()=> initialState
    }
})

export const {addToCart,removeCartitems,calculatePrice,discountApplied,saveShippingInfo,resetCart} = cartReducer.actions;

    //    alt + shift + O