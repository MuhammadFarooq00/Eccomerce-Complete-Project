/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartItems } from "../types/types";

type cartitemsprops = {
   cartitem: any;
   incrementHandler: (cartitems: cartItems ) => void;
   decrementHandler: (cartitems: cartItems ) => void;
   removeHandler: (_id:string ) => void;

}

const Cartitem = ({cartitem,incrementHandler,decrementHandler,removeHandler}:cartitemsprops) => {
    const {photo,name,quantity,price,productID}= cartitem;
  return (
    <>
      <div className="cartItem">
         <img src={`http://localhost:3000/${photo}`} alt={name} />
         <article>
          <Link to={`/product/${productID}`}>{name}</Link>
          <span>Rs{price}</span>
         </article>
         <div>
          <button onClick={()=>incrementHandler(cartitem)}>+</button>
          <p>{quantity}</p>
          <button onClick={()=>decrementHandler(cartitem)}>-</button>
         <button onClick={()=>removeHandler(productID)}><FaTrash/></button>
         </div>
      </div>
    </>
  )
}

export default Cartitem
