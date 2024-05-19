/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaPlus } from "react-icons/fa";
import { cartItems } from "../types/types";
type Productsprops = {
    productID: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler:  (cartitem: cartItems) => void;
}
const Productcart = ({productID,photo,name,price,stock,handler}:Productsprops) => {

  const server = "http://localhost:3000";

  return (
    <>
      <div className="productcard">
        
        <img src={`${server}/${photo}`} alt={name} />
        <p>{name}</p>
        <span>Rs {price}</span>
        
        <div>
       <button onClick={()=> handler({productID,photo,name,price,stock,quantity:1})}><FaPlus/></button>
      
       </div>
      </div>
    </>
  )
}

export default Productcart
