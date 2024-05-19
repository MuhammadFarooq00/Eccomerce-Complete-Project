import { useState } from "react"
import Sidebar from "../../../components/admincomponents/Sidebar"
import "../../../style/adminstles/app.scss"


const TossApp = () => {

  const [angle,setangle] = useState<number>(0);

  const setflip = ()=>{
    if(Math.random()>0.5){
      return setangle((prev)=> prev + 180);
    }
    else{
      return setangle((prev)=> prev + 360);
    }
  }
  return (
    <>
      <div className="admincontainer">
        <Sidebar />
        <main className="dashboardAppContainer">
        <h1>Toss</h1>
        <section>
          <article className="tosscoin" onClick={setflip} style={{transform: `rotateY(${angle}deg)`}}>
            <div></div>
            <div></div>
          </article>
        </section>
        </main>
        </div>
    </>
  )
}

export default TossApp
