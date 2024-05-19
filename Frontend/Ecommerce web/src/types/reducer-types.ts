/* eslint-disable @typescript-eslint/ban-types */
import { User, cartItems, shippingInfo } from "./types";


export interface userReducerinitailstate {
    user: User | null;
    loading: boolean
}

export interface cartReducerinitailstate {
    loading: boolean;
    cartItems: cartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfo;
}