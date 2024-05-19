/* eslint-disable @typescript-eslint/no-unused-vars */
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NewOderItemRequest } from "../types/api-types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart } from "../redux/reducer/cartreducer";
import { responseToast } from "../utils/features";
// import { redirect } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PCeKX02W2AiAFpz2n7rok9COEOQdhuGeNXovHgNjV2Aug6mFjJkPQ33CZevnhrYWfzsq5z1TZZfmpo1FOKgi6hg00mmo7dby0');

const CheckoutForm = ()=>{
    const stripe = useStripe();
    const elements = useElements();
    const [isprocessing, setisprocessing] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user} = useSelector((state: RootState)=> state.userReducer);
    const {shippingInfo,cartItems,subtotal,discount,tax,shippingCharges,total} = useSelector((state: RootState)=> state.cartReducer);
    const [newOrder] = useNewOrderMutation();
    const dispatch = useDispatch();

    const submithandler = async (e:FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if(!stripe || !elements) return;
        setisprocessing(true);
        const orderData:NewOderItemRequest = {
            shippingCharges,
            shippingInfo,
            cartItems,
            subtotal,
            tax,
            discount,
            total,
            user: user?._id as string,
        };

       const {paymentIntent,error}= await stripe.confirmPayment({elements,confirmParams:{return_url:window.location.origin},redirect:"if_required",})

       if(error) return toast.error(error.message || "Something Went Wrong");
       if(paymentIntent.status === "succeeded"){
        const res = await newOrder(orderData);
        dispatch(resetCart());
        console.log("placing Order successfully");
        responseToast(res,navigate,'/orders')
       }
       setisprocessing(false);
        // setTimeout(() => {
        //     setisprocessing(false);
        // }, 2000);
    }
    return (
        <>
        <div className="checkoutcontainer">
        <form onSubmit={submithandler}>
            <PaymentElement/>
            <button type="submit" disabled={isprocessing}>{isprocessing? "processing...": "pay"}</button>
        </form>
        </div>
        </>
    )
}

const CheckOut = () => {
    const location = useLocation();
    const clientSecret:string | undefined = location.state;
    if(!clientSecret) return <Navigate to={'/shipping'}/>

  return (
    <Elements options={{clientSecret,}} stripe={stripePromise}>
    <CheckoutForm/>
    </Elements>
  )
}

export default CheckOut