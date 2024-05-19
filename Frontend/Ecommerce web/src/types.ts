
export type Orderitemtype = {
    name: string,
    photo: string,
    price: number,
    quantity: number;
    _id: string,
}

export type Ordertype = {
    name: string,
    address: string,
    city: string,
    country: string,
    state: string,
    pincode: number,
    status: 'processing' | 'delivered' | 'shipped',
    subTotal: number,
    discount: number,
    shippingCharges: number,
    tax: number,
    total: number,
    orderITems: Orderitemtype[]
    _id: string,
}