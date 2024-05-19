/* eslint-disable @typescript-eslint/no-unused-vars */
// import { IconType } from "react-icons"
import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBagFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
 
     const [model,showmodel] = useState<boolean>(false)
     const [phoneActive, setphoneActive] = useState<boolean>(
        window.innerWidth < 1100
     )

     const resizehandler = ()=>{
        setphoneActive(window.innerWidth < 1100)
     }
     useEffect(()=>{
        window.addEventListener("resize",resizehandler);

        return ()=>{
            window.removeEventListener("resize",resizehandler)
        }
     },[])

    return (
        
    <div>
        {
            phoneActive && (<button id="hamburger" onClick={()=> showmodel(true)}><HiMenuAlt4/></button>)
        }
        <aside style={phoneActive?{
         width:"20rem",
         height: "100vh",
         position: "fixed",
         top: "0",
         left: model? "0" : "-20rem",
         transition: "all 0.5s"
        }: {}}>
            <h2>LOGO.</h2>
            <div>
                <h5>Dashboard</h5>
                <UOL1/>
                <UOL2/>
                <Apps/>
                {phoneActive &&  (<button id="closingbutton" onClick={()=> showmodel(false)}>Close</button>)}
            </div>
        </aside>
    </div>
  )
}

// interface Listprops  {url:string; text: string; location: Location; Icon: IconType;  }

// const Li = ({url, text, location, Icon}:Listprops) => (<li>
    //  <Link to={url}>
    //     <Icon />
    //     {text}
    //  </Link>
// </li>)

const UOL1 = ()=>{
    const location = useLocation();
   return (
    <>
     <ul>
                <li style={{backgroundColor: location.pathname.includes('/admin/dashboard') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/dashboard') ? "rgb(0,115,255)" : "black",}} to='/admin/dashboard'> <RiDashboardFill/> Dashboard  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/products') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/products') ? "rgb(0,115,255)" : "black",}} to='/admin/products'> <RiShoppingBagFill/> Products  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/customers') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/customers') ? "rgb(0,115,255)" : "black",}} to='/admin/customers'> <IoIosPeople/> Customer  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/transactions') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/transactions') ? "rgb(0,115,255)" : "black",}} to='/admin/transactions'> <AiFillFileText/> Transactions  </Link></li>
                </ul>
    </>
   )
}

const UOL2 = ()=>{
    const location = useLocation();
   return (
    <>  
        <h5>charts</h5>
               <ul>
                <li style={{backgroundColor: location.pathname.includes('/admin/chart/bar') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/chart/bar') ? "rgb(0,115,255)" : "black",}} to='/admin/chart/bar'> <FaChartBar/> Bar  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/chart/pie') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/chart/pie') ? "rgb(0,115,255)" : "black",}} to='/admin/chart/pie'> <FaChartPie/> Pie  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/chart/line') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/chart/line') ? "rgb(0,115,255)" : "black",}} to='/admin/chart/line'> <FaChartLine/> Line  </Link></li>
                </ul>
    </>
   )
}

const Apps = ()=>{
    const location = useLocation();
   return (
    <>  
        <h5>Apps</h5>
               <ul>
                <li style={{backgroundColor: location.pathname.includes('/admin/app/stopwatch') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/app/stopwatch') ? "rgb(0,115,255)" : "black",}} to='/admin/app/stopwatch'> <FaStopwatch/> Stopwatch  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/app/coupon') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/app/coupon') ? "rgb(0,115,255)" : "black",}} to='/admin/app/coupon'> <RiCoupon3Fill/> Coupon  </Link></li>
                <li style={{backgroundColor: location.pathname.includes('/admin/app/toss') ? "rgba(0,115,255,0.1)" : "white",}}><Link style={{color: location.pathname.includes('/admin/app/toss') ? "rgb(0,115,255)" : "black",}} to='/admin/app/toss'> <FaGamepad/> Toss  </Link></li>
                </ul>
        
    </>
   )
}


export default Sidebar
