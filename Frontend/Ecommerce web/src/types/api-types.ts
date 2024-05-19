import { Order, Pietypes, Product, Stats, User, bartype, cartItems, linetype, shippingInfo } from "./types"


export type MessageResponse = {
    succes: boolean,
    message: string,
}

export type AllUsersResponse = {
    succes: boolean,
    message: User[],
}

export type DeleteUserRequest = {
    userId: string,
    adminUserId: string,
}

export type ProductsDetails = {
    succes: boolean,
    message:  Product,
}

export type userResponse = {
    succes: boolean,
    user: User,
}

export type AllProductResponse = {
    succes: boolean,
    message: Product[],
}

export type SearchproductsResponse =  {
    succes: boolean,
    products: Product[],
    totalpage: number;
}

export type SearchproductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}

export type CategoriesResponse = {
    succes: boolean,
    message: string[],
}

export type CostomError = {
    status: number;
    data: {
        message: string;
        success: boolean
    }
}

export type NewProductResponse = {
    _id: string;
    formData: FormData;
}

export type UpdateProductResponse = {
     userID: string;
    _id: string;
    formData: FormData;
}

export type DeleteProductResponse = {
    userID: string;
   _id: string;
}

export type NewOderItemRequest = {
    cartItems: cartItems[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfo;
    user: string;
}

export type AllordersResponse = {
    success: boolean;
    orders: Order[]
}

export type OrderdetailsResponse = {
    success: boolean;
    order: Order[]
}

export type UpdateOrderResquest = {
    userID: string;
    orderID: string;
}


// admin panel stats  

export type StatsResponse = {
    success: boolean;
    stats: Stats
}

export type PieResponse = {
    success: boolean;
    PieChartStats: Pietypes
}

export type BarResponse = {
    success: boolean;
    BarChartStat: bartype
}

export type LineResponse = {
    success: boolean;
    LineChartStat: linetype
}