/* eslint-disable react-hooks/exhaustive-deps */
import React, { FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartReducerinitailstate } from "../types/reducer-types";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartreducer";


const Shipping = () => {
  const { cartItems,total } = useSelector((state: { cartReducer: cartReducerinitailstate }) => state.cartReducer);
  const dispatch = useDispatch();
  console.log(cartItems);
  const [shippingInfo, setshippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  })
  const changehandler = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
    const {name,value} = e.target;
    setshippingInfo((prev)=>{
      return {...prev, [name]:value}
    })
  };
     const navigate = useNavigate();
      useEffect(()=>{
        if(cartItems.length <=0 ) return navigate("/cart")
    },[cartItems])
  const submithanler = async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    try {
      const {data} = await axios.post("http://localhost:3000/api/v1/payment/create",{amount:total},{headers:{"Content-Type":"application/json"}});
      navigate('pay',{state: data.clientSecret})
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }
  return (
    <>
      <div className="shipping">
        <Link to='/cart'><button><BiArrowBack/></button></Link>

        <form onSubmit={submithanler}>
          <h1>Shipping Address</h1>
          <input required type="text" value={shippingInfo.address} onChange={changehandler} name="address" placeholder="address"/>
          <input required type="text" value={shippingInfo.city} onChange={changehandler} name="city" placeholder="City"/>
          <input required type="text" value={shippingInfo.state} onChange={changehandler} name="state" placeholder="State"/>
          
          <select name="country" required onChange={changehandler} value={shippingInfo.country}>
            <option value="">Choose Coutry</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>

          </select>
          
          <input required type="number" value={shippingInfo.pinCode} onChange={changehandler} name="pinCode" placeholder="PinCode "/>
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </>
  )
}

export default Shipping
