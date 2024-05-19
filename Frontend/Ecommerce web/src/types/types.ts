

export interface User{
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}


export interface Product {
    name: string;
    price: number;
    stock: number;
    photo: string;
    category: string;
    _id: string;
}

export type shippingInfo = {
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
}

export type cartItems = {
    productID: string;
    price: number;
    photo: string;
    name: string;
    quantity: number;
    stock: number;
}

export type OrderItem = Omit<cartItems,"stock"> & {_id: string}

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: shippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {name: string; _id: string} | string;
    _id: string;
}


/// admin dashboard stats type

export type latestTransaction = {
    _id: string,
    discount: number,
    amount: number,
    quantity: number,
    status: string
}

export type orderstat = {
    _id: string,
    total: number
}

export type countstat = {
    revenue: number,
    user: number,
    product: number,
    orders: orderstat[],
}
 
export type Stats = {
    CategoryCount: Record<string,number>[];
    chart: any;
    productChangepercentage: number;
    orderChangepercentage: number;
    userChangepercentage: number;
    OderChangeRevenue: number;
    count: any;
    genderRatio: any;
    latestTransaction: any;
    stats: {
        genderRatio: {
            male: number,
            female: number
        },
        CategoryCount: Record<string,number>[],
        userChangepercentage: number,
        orderChangepercentage: number,
        productChangepercentage: number,
        OderChangeRevenue: number,
        count: countstat,
        chart: {
            order: number[],
            revenue: number[],
        },
        latestTransaction: latestTransaction[]
    }
};


export type Pietypes = {
    OrderedFullfillment: {
        Processed: number,
        shipped: number,
        delivered: number
    },
    ProductCategoryCount: Record<string,number>[],
    StockAvailability: {
        Instock: number,
        productOutofstock: number
    },
    RevnueDistribution: {
        netMargin: number,
        totalDiscount: number,
        productionCost: number,
        burnt: number,
        MarketingCost: number
    },
    AdminCustomer: {
        admin: number,
        customer: number
    },
    UserageGroup: {
        teen: number,
        adult: number,
        old: number,
    }
}

export type bartype = {
    users: number[],
    products: number[],
    orders: number[]
}

export type linetype = {
    users: number[],
    products: number[],
    discount: number[],
    revenue: number[],
}
