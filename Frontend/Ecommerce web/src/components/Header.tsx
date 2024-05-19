import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, redirect } from "react-router-dom"
import { User } from "../types/types"
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";


// const user = {id: "",role: ""}

interface Propstype {
  user: User | null;
}

const Header = ({user}: Propstype) => {
    const [open, setisopen] = useState<boolean>(false)

    const logouthandler = async ()=>{
        try {
          
          await signOut(auth);
          toast.success("Sign Out Successfully");
          redirect("/login");

          setisopen(false);
        } catch (error) {
          toast.error("Sign Out failed")
        }
        
    }
  return (
    <>
      <nav className="header">
        <Link to='/' onClick={()=>setisopen(false)}>HOME</Link>
        <Link to='/search' onClick={()=>setisopen(false)}><FaSearch/> Search</Link>
        <Link to='/cart' onClick={()=>setisopen(false)}><FaShoppingBag/> Cart</Link>
        {
        user?._id? <>
        <button onClick={()=>setisopen((prev)=>!prev)}><FaUser/></button>
        <dialog open= {open}>
        <div>
          {user.role === "admin" && (<Link to='/admin/dashboard'>Admin Panel</Link>)}   
          
          <Link to='/orders'>Orders</Link>
          <button onClick={logouthandler}><FaSignOutAlt/></button>
        </div>    
        </dialog> 
        </>: <Link to='/login'><FaSignInAlt/> SignIn</Link>
      }
      </nav>
      
    </>
  )
}

export default Header
