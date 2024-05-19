import { useEffect, useState } from "react";
import Sidebar from "../../../components/admincomponents/Sidebar"
import "../../../style/adminstles/app.scss"


const FormatTime = (timesinsecond:number)=>{
      const hour = Math.floor(timesinsecond/3600);
      const minutes = Math.floor((timesinsecond%3600)/60);
      const seconds = timesinsecond%60;
      
      const hoursinstring = hour.toString().padStart(2,'0');
      const minutesinstring = minutes.toString().padStart(2,'0');
      const secondsinstring = seconds.toString().padStart(2,'0');
      
      return `${hoursinstring}:${minutesinstring}:${secondsinstring}`
}

const StopWatch = () => {
  const [time,settime] = useState<number>(0);
  const [isruning,setisrunning] = useState<boolean>(false);

   const resethandler =()=>{
    settime(0);
    setisrunning(false);
   }

  useEffect(()=>{
    let intervalID:number | NodeJS.Timeout;
    if(isruning){
      intervalID= setInterval(()=>{
        settime((prev)=> prev+1);
      },1000);
    }
    return ()=>{
      clearInterval(intervalID)
    }
  },[isruning])
  return (
    <>
      <div className="admincontainer">
        <Sidebar />
        <main className="dashboardAppContainer">
        <h1>Stop-Watch</h1>
        <section>
          <div className="stopwatch">
            <h2>{FormatTime(time)}</h2>
            <button onClick={()=> setisrunning((prev)=> !prev)}>{isruning? "Stop":"Start"}</button>
            <button onClick={resethandler}>Reset</button>
          </div>
        </section>
        </main>
        </div>
    </>
  )
}

export default StopWatch
