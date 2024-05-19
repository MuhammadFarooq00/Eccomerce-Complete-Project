import React, { useEffect, useState } from "react"
import Sidebar from "../../../components/admincomponents/Sidebar"
import "../../../style/adminstles/app.scss"


interface typedata{
    textfield: string;
    size: number;
    includenumbers:boolean;
    includechrachters: boolean;
    includesymbols: boolean;
    iscopied: boolean;
    coupon: string;
}

const letters:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers:string = '1234567890';
const specialCharacters:string = '!@#$%^&*()-_+=[]{}|;:,.<>?/~';

const CouponApp = () => {
  const [initialstate, finalstate] = useState<typedata>({
    textfield: "",
    size: 8,
    includenumbers: false,
    includechrachters: false,
    includesymbols: false,
    iscopied: false,
    coupon: ''
  })

  const changeeventhandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const val = e.target.value;
      const name = e.target.name;
      finalstate((prev)=>{
        return {...prev, [name]:val}
      })
  }

  const Textcopy =async (coupon: string)=>{
     await window.navigator.clipboard.writeText(coupon);
     finalstate((prev)=> ({...prev, iscopied: true}))
  }

  const submithandler = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!initialstate.includenumbers && !initialstate.includechrachters && !initialstate.includesymbols){
      alert("Choose at least One of them");
    }
    let result: string = initialstate.textfield || "";
    const looplength: number = initialstate.size - result.length;
    for(let i=0; i<looplength; i++){
      let entirestring:string = "";
      if(initialstate.includechrachters) entirestring += letters;
      if(initialstate.includenumbers) entirestring += numbers;  
      if(initialstate.includesymbols) entirestring += specialCharacters; 
       
      const randumnumber: number = ~~(Math.random()*entirestring.length);
      result += entirestring[randumnumber];
    }
    finalstate((prev) => ({ ...prev, coupon: result }));
  }
  useEffect(()=>{
           finalstate((prev)=> ({...prev, iscopied: false}))
  },[initialstate.coupon])
  return (
    <>
      <div className="admincontainer">
        <Sidebar />
        <main className="dashboardAppContainer">
        <h1>Coupon Generator</h1>
        <section>
          <form className="couponform" onSubmit={submithandler}>
            <input type="text" name="textfield" value={initialstate.textfield} onChange={changeeventhandler} maxLength={initialstate.size} placeholder="text to include"  />
            <input type="number" name="size" value={initialstate.size} onChange={changeeventhandler} min={8} max={25} placeholder="Coupon Length"  />
          <fieldset>
            <legend>include</legend>
            <input type="checkbox" checked={initialstate.includenumbers} name="includenumbers" onChange={()=>finalstate((prev)=> ({...prev, includenumbers: !prev.includenumbers}))} />
             <span>Number</span>
             <input type="checkbox" checked={initialstate.includechrachters} name="includechracters" onChange={()=>finalstate((prev)=> ({...prev, includechrachters: !prev.includechrachters}))} />
             <span>Chracter</span>
             <input type="checkbox" checked={initialstate.includesymbols} name="includesymbols" onChange={()=>finalstate((prev)=> ({...prev, includesymbols: !prev.includesymbols}))} />
             <span>Symbols</span>
          </fieldset>
          <button type="submit">Generate Coupon</button>
          </form>
          {
            initialstate.coupon && <code>{initialstate.coupon} <span onClick={()=> Textcopy(initialstate.coupon)}>{initialstate.iscopied? "Copied":"Copy"}</span></code>
          }
        </section>
        </main>
        </div>
    </>
  )
}

export default CouponApp
