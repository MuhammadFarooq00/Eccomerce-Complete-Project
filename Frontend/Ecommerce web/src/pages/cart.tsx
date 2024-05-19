/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import Cartitem from "../components/Cartitem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerinitailstate } from "../types/reducer-types";
import { cartItems } from "../types/types";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartitems,
} from "../redux/reducer/cartreducer";
import axios from "axios";

// const cartitems = [
//   {
//     productID:"123",
//     name:"MacBook" ,
//     price:3000,
//     quantity: 4,
//     stock:435,
//     photo:"https://m.media-amazon.com/images/I/61Izntd7yML._AC_SX450_.jpg",
//   }
// ];
// const subtotal = 4000;
// const tax = Math.round(subtotal* 0.18);
// const shippingcharges = 200;
// const discount = 400;
// const total = subtotal + tax + shippingcharges;

const Cart = () => {
  const { cartItems, subtotal, total, shippingCharges, discount, tax } =
    useSelector(
      (state: { cartReducer: cartReducerinitailstate }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [coupon, setcoupon] = useState<string>("");
  const [isvalidcouponCode, setisvalidcouponcode] = useState<boolean>(false);

  const incrementHandler = (cartitem: cartItems) => {
    if (cartitem.quantity >= cartitem.stock) return;
    dispatch(addToCart({ ...cartitem, quantity: cartitem.quantity + 1 }));
  };
  const decrementHandler = (cartitem: cartItems) => {
    if (cartitem.quantity <= 1) return;
    dispatch(addToCart({ ...cartitem, quantity: cartitem.quantity - 1 }));
  };
  const removeHandler = (productID: string) => {
    dispatch(removeCartitems(productID));
  };
  useEffect(() => {
    const {token:cancelToken, cancel} = axios.CancelToken.source();
    const timeoutID = setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/v1/payment/discount?code=${coupon}`,{cancelToken,})
        .then((res) => {
          dispatch(discountApplied(res.data.discountAmount))
          setisvalidcouponcode(true);
    dispatch(calculatePrice());
          console.log(res.data);
        })
        .catch((e) => {
          setisvalidcouponcode(false);
          dispatch(discountApplied(0));
    dispatch(calculatePrice());
          console.log(e.response.data.message);
        });
      if (Math.random() > 0.5) {
        return setisvalidcouponcode(true);
      } else {
        setisvalidcouponcode(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
      cancel();
      setisvalidcouponcode(false);
    };
  }, [coupon]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <>
      <div className="cart">
        <main>
          {cartItems.length > 0 ? (
            cartItems.map((val, index) => (
              <Cartitem
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                cartitem={val}
                key={index}
              />
            ))
          ) : (
            <h1>No items found</h1>
          )}
        </main>
        <aside>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>
            Discount: <em>{discount}</em>
          </p>
          <p>
            <b>Total: {total}</b>
          </p>
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setcoupon(e.target.value)}
          />
          {coupon &&
            (isvalidcouponCode ? (
              <span className="green">
                Rs{discount} of using the <code>{coupon}</code>
              </span>
            ) : (
              <span className="red">
                Invalid Coupon <VscError />
              </span>
            ))}
          {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
        </aside>
      </div>
    </>
  );
};

export default Cart;
