/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import Sidebar from "../../../components/admincomponents/Sidebar";
import "../../../style/adminstles/app.scss";
// import { Orderitemtype, Ordertype } from "../../../types";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Orderitemtype } from "../../../types";
import { useSelector } from "react-redux";
import { userReducerinitailstate } from "../../../types/reducer-types";
import { useDeleteOrderMutation, useOdersDetailsQuery, useOrderUpdateMutation } from "../../../redux/api/orderApi";
import { Order } from "../../../types/types";
import { responseToast } from "../../../utils/features";

// const orderitem: Orderitemtype[] = [
//   {
//     name: "Puma shoes",
//     photo: "https://picsum.photos/200/300",
//     price: 950,
//     quantity: 1,
//     _id: "12sfd32",
//   },
// ];

// const orderitem:any[] = [];
const DefaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: "",
  },
  status: "processing",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};
const TransactionMangement = () => {
  // const [item, setitem] = useState<Ordertype>({
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );

  const { data, isError} = useOdersDetailsQuery(param.id!);
  console.log(data?.order)
  const {
    shippingInfo: { address, city, state, country, pincode},
    orderItems,
    user: { name },
    total,
    subtotal,
    discount,
    status,
    tax,
    shippingCharges,
  } = data?.order || DefaultData;

  // const [item, setitem] = useState({});

  //   const [item, setitem] = useState({
  //   name: "Abhishekh Sharma",
  //   address: "Surises hydrabad SRH town 43",
  //   city: "Hydrabad",
  //   country: "India",
  //   state: "Newada",
  //   pincode: 243,
  //   status: "processing",
  //   subTotal: 4000,
  //   discount: 1200,
  //   shippingCharges: 0,
  //   tax: 200,
  //   total: 4000 + 200 + 0 - 1200,
  //   orderITems: orderitem,
  //   _id: "12sfd32",
  // });

  // const updatehandler = ()=>{
  //   setitem((prev)=>({
  //     ...prev,
  //     status: prev.status === 'processing'? 'shipped': 'delivered',
  //   }));
  // };

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useOrderUpdateMutation();

  const updatehandler =async () => {
    const res = await updateOrder({userID: user?._id as string,orderID: data?.order._id as string});
    responseToast(res,navigate,'/admin/transactions')
  };
  const Deletehandler =async () => {
    const res = await deleteOrder({userID: user?._id as string,orderID: data?.order._id as string});
    responseToast(res,navigate,'/admin/transactions')
  };

   if (isError) return <Navigate to={'/404'}/>
  return (
    <>
      <div className="admincontainer">
        <Sidebar />
        <main className="productmanagement">
          <section>
            <h2>Order Items</h2>
            {orderItems.map((val:Orderitemtype) => (
              <ProductCard key={val._id}
                name={val.name}
                photo={val.photo}
                price={val.price}
                quantity={val.quantity}
                _id={val._id}
              />
            ))}
          </section>
          <article className="shippinginfocard">
            <button className="deltehandle" onClick={Deletehandler}>
              Delete <FaTrash />
            </button>
            <h1>Order Info</h1>
            <h5>User info</h5>
            <p>Name: {name}</p>
            <p>
              {" "}
              Address:{" "}
              {`${address} ${city} ${state} ${country} ${pincode}`}
            </p>
            <h5>Amount Info</h5>
            <p>Sub-total: {`${subtotal}`}</p>
            <p>Shipping-Charges: {`${shippingCharges}`}</p>
            <p>Tax: {`${tax}`}</p>
            <p>Discount: {`${discount}`}</p>
            <p>Total: {`${total}`}</p>
            <h5>Status-Info</h5>
            <p>
              Status:{" "}
              <span
                className={
                  status === "delivered"
                    ? "purple"
                    : status === "shipped"
                    ? "green"
                    : "red"
                }
              >{`${status}`}</span>
            </p>
            <button onClick={updatehandler}>Update Status</button>
          </article>
        </main>
      </div>
    </>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: Orderitemtype) => {
  return (
    <>
      <div className="transactionProductcard">
        <img src={`http://localhost:3000/${photo}`} alt={name} />
        <Link to={`/product/${_id}`}>{name}</Link>
        <span>
          ${price} X {quantity} = ${price * quantity}
        </span>
      </div>
    </>
  );
};

export default TransactionMangement;
