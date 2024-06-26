

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userapi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [gender,setgender] = useState("")
  const [date,setdate] = useState("")

  const [login] = useLoginMutation();

  const loginhandler = async ()=>{
    try {
      const provider = new GoogleAuthProvider();
      const{ user }= await signInWithPopup(auth,provider);

     const res = await login({
      name: user.displayName as string,
      email: user.email as string,
      photo: user.photoURL as string,
      gender,
      role: "user",
      dob: date,
      _id: user.uid,
     })
     if("data" in res){
       toast.success(res.data.message);
     }
     else{
      const error = res.error as FetchBaseQueryError;
      const message = error.data as MessageResponse;
      toast.error(message.message)
     }

      console.log(user);
    } catch (error) {
      toast.error("sign in Fail");
    }
  }
  return (
    <>
      <div className="login">
        <main>
          <h1 className="heading">Login</h1>
          <div>
            <label htmlFor="gender">Gender</label>
            <select value={gender} onChange={(e)=> setgender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date of Birth</label>
            <input type="date" value={date} onChange={(e)=> setdate(e.target.value)}/>
          </div>
          <div>
            <p>Already Signed In Once</p>
            <button onClick={loginhandler}><FcGoogle/> <span>Sign in with Google</span></button>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login
