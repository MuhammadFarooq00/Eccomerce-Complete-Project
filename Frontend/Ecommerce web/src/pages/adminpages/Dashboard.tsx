/* eslint-disable @typescript-eslint/no-unused-vars */
import { BsSearch } from "react-icons/bs";
import Sidebar from "../../components/admincomponents/Sidebar";
import "../../style/adminstles/app.scss";
import { FaRegBell } from "react-icons/fa";
import userimage from "../../assets/adminimages/user.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// import datas from "../../assets/adminimages/data.json";
import { BarChart, Doughnutchart } from "../../components/admincomponents/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Dashboardtable from "../../components/admincomponents/Dashboardtable";
import { useStatsQuery } from "../../redux/api/dashboard";
import { useSelector } from "react-redux";
import { userReducerinitailstate } from "../../types/reducer-types";
import toast from "react-hot-toast";
import { CostomError } from "../../types/api-types";
import { useEffect, useState } from "react";
// import { latestTransaction } from "../../types/types";
const Dashboard = () => {
  const { user } = useSelector((state: { userReducer: userReducerinitailstate }) => state.userReducer);
  const [loading, setLoading] = useState(true);
    const {data,isError,error} = useStatsQuery(user?._id as string)
    useEffect(()=>{
      if(isError) {
        const err = error as CostomError;
        toast.error(err.data.message)
      }else if (data) {
        console.log(data.stats);
        setLoading(false);
      }
    },[data,error,isError])
 
    // console.log(user?.photo)

  return (
    <>
      {loading} <div className="admincontainer">
        <Sidebar />
        <main className="dashboard">
          <div className="bar">
            <BsSearch />{" "}
            <input type="text" placeholder="search for data, docs, users" />{" "}
            <FaRegBell />
            <img
              src={ user?.photo||userimage}
              alt="userimage"
              style={{ height: "70%", width: "auto" }}
            />
          </div>

          <section className="widgetcontainer">
            {data && <Widgetitem
              heading="Revenue"
              value={data.stats.count.revenue}
              amount={true}
              percent={data.stats.OderChangeRevenue}
              color="rgba(0,115,255)"
            />}
            {data && <Widgetitem
              heading="Users"
              value={data.stats.count.user}
              percent={data.stats.userChangepercentage}
              color="rgba(0,198,202)"
            />}
            {data &&<Widgetitem
              heading="Transactions"
              value={data.stats.count.orders.length}
              percent={data.stats.orderChangepercentage}
              color="rgba(255,196,0)"
            />}
            {data && <Widgetitem
              heading="Products"
              value={data.stats.count.product}
              amount={true}
              percent={data.stats.productChangepercentage}
              color="rgba(76, 0, 255)"
            />}
          </section>

          <section className="graphcontainer">
            <div className="revnuecharts" style={{width:"70%"}}>
              <h2>Revnue & Transaction</h2>
              {data && <BarChart
                data_1={data.stats.chart.revenue}
                data_2={data.stats.chart.order}
                title_1="Revenue"
                title_2="Transaction"
                bg_color1="rgb(0,115,255)"
                bg_color2="rgba(53,162,235,0.8)"
              />}
            </div>

            {/* <div className="dashboardcatogories">
              <h2>Inventory</h2>
              <div> */}
                {/* <Catogaryitem heading="Laptop" value={40} color="hsl(69, 100%,50%)"/> */}
                {/* {data && datas.categories.map((val) => {
                  // const [heading,value] = Object.entries(val)[0];
                  return (
                  
                    <Catogaryitem
                      key={val.heading}
                      heading={val.heading}
                      value={val.value}
                      color={`hsl(${val.value * 4}, ${val.value}%,50%)`}
                    />
                  )
                })} */}
              
              {data && (
  <>
    {data.stats && data.stats.CategoryCount.length > 0 ? (
      <>
      {console.log(data.stats)}
      <div className="dashboardcatogories">
        <h2>Inventory</h2>
        <div>
          {data && data.stats.CategoryCount.map((category) => {
            const  [heading, value] = Object.entries(category)[0];
            console.log(category)
            return (
              <Catogaryitem
                key={heading}
                heading={heading}
                value={value}
                color={`hsl(${value * 4}, ${value}%, 50%)`}
              />
            );
          })}
        </div>
      </div>
      </>
    ) : (
      <p>No category data available</p>
    )}
  </>
)}
 </section>

          <section className="transactionContainer">
            <div className="genderChart">
              <h2>Gender Ratio</h2>
              {data && (<Doughnutchart labels={["Female", "Male"]} data={[data?.stats?.genderRatio?.female, data?.stats?.genderRatio?.male]} backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]} cutout={90}/>)}
              <p><BiMaleFemale/></p>
            </div>
            {/* table .................................. */}
            {/* <Dashboardtable data={data?.stats.latestTransaction}/> */}
               {data?.stats && data.stats.latestTransaction.length > 0 && (
                  <Dashboardtable data={data.stats.latestTransaction} />
               )}
          </section>
        </main>
      </div>
    </>
  );
};

interface widgetitemprops {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const Widgetitem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: widgetitemprops) => (
  <article className="widget">
    <div className="widgetinfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> + {percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>
    <div
      className="widgetcircle"
      style={{
        background: `conic-gradient(${color} ${
          (Math.abs(percent) / 100) * 360
        }deg, rgb(255, 255, 255) 0)`, 
      }}
    >
      <span style={{ color: `${color}` }}> {percent}% </span>
    </div>
  </article>
);
interface catogaryitemprops {
  heading: string;
  value: number;
  color: string;
}
const Catogaryitem = ({ heading, value, color }: catogaryitemprops) => (
  <div className="catogoriesitem">
    <h5>{heading}</h5>
    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;



/* eslint-disable @typescript-eslint/no-unused-vars */




// import { BsSearch } from "react-icons/bs";
// import Sidebar from "../../components/admincomponents/Sidebar";
// import "../../style/adminstles/app.scss";
// import { FaRegBell } from "react-icons/fa";
// import userimage from "../../assets/adminimages/user.png";
// import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// // import datas from "../../assets/adminimages/data.json";
// import { BarChart, Doughnutchart } from "../../components/admincomponents/Charts";
// import { BiMaleFemale } from "react-icons/bi";
// import Dashboardtable from "../../components/admincomponents/Dashboardtable";
// import { useStatsQuery } from "../../redux/api/dashboard";
// import { useSelector } from "react-redux";
// import { userReducerinitailstate } from "../../types/reducer-types";
// import toast from "react-hot-toast";
// import { CostomError } from "../../types/api-types";
// import { useEffect, useState } from "react";
// import { Stats, countstat } from "../../types/types";
// const Dashboard = () => {
//   const { user } = useSelector((state: { userReducer: userReducerinitailstate }) => state.userReducer);
//   const [datadashBoard, setdataDashboard] = useState<Stats>({
//     stats: {
//       genderRatio: {
//           male: 0,
//           female: 0
//       },
//       CategoryCount: [],
//       userChangepercentage: 0,
//       orderChangepercentage: 0,
//       productChangepercentage: 0,
//       OderChangeRevenue: 0,
//       count: {} as countstat,
//       chart: {
//           order: [],
//           revenue: [],
//       },
//       latestTransaction: []
//   }
//   }
//   )
//     const {data,isError,error} = useStatsQuery(user?._id as string)
//     // const stats = data?.stats;

//     if(isError) {
//       const err = error as CostomError;
//       toast.error(err.data.message)
//     } else if (data) {
//       console.log(data?.stats); // Verify data structure in console
//       setdataDashboard(data.stats);
//     }
//     // console.log(data?.stats)
   
//     // useEffect(()=>{
//     //       if(data?.stats)
//     //       setdataDashboard(data.stats)
//     // },[data?.stats])

//     console.log(datadashBoard)

//   return (
//     <>
//      {datadashBoard.stats} && <div className="admincontainer">
//         <Sidebar />
//         <main className="dashboard">
//           <div className="bar">
//             <BsSearch />{" "}
//             <input type="text" placeholder="search for data, docs, users" />{" "}
//             <FaRegBell />
//             <img
//               src={user?.photo || userimage}
//               alt="userimage"
//               style={{ height: "70%", width: "auto" }}
//             />
//           </div>

//           <section className="widgetcontainer">
//             <Widgetitem
//               heading="Revenue"
//               value={datadashBoard.stats.count.revenue}
//               amount={true}
//               percent={datadashBoard.stats.OderChangeRevenue}
//               color="rgba(0,115,255)"
//             />
//             <Widgetitem
//               heading="Users"
//               value={datadashBoard.stats.count.user}
//               percent={datadashBoard.stats.userChangepercentage}
//               color="rgba(0,198,202)"
//             />
//             <Widgetitem
//               heading="Transactions"
//               value={datadashBoard.stats.count.orders.length}
//               percent={datadashBoard.stats.orderChangepercentage}
//               color="rgba(255,196,0)"
//             />
//             <Widgetitem
//               heading="Products"
//               value={datadashBoard.stats.count.product}
//               amount={true}
//               percent={datadashBoard.stats.productChangepercentage}
//               color="rgba(76, 0, 255)"
//             />
//           </section>

//           <section className="graphcontainer">
//             <div className="revnuecharts">
//               <h2>Revnue & Transaction</h2>
//               <BarChart
//                 data_1={datadashBoard.stats.chart.revenue}
//                 data_2={datadashBoard.stats.chart.order}
//                 title_1="Revenue"
//                 title_2="Transaction"
//                 bg_color1="rgb(0,115,255)"
//                 bg_color2="rgba(53,162,235,0.8)"
//               />
//             </div>

//             <div className="dashboardcatogories">
//               <h2>Inventory</h2>
//               <div>
//                 {/* <Catogaryitem heading="Laptop" value={40} color="hsl(69, 100%,50%)"/> */}
//                 {datadashBoard.stats.CategoryCount.map((val) => {
//                   const [heading,value] = Object.entries(val)[0];
//                   return (
                  
//                     <Catogaryitem
//                       key={heading}
//                       heading={heading}
//                       value={value}
//                       color={`hsl(${value * 4}, ${value}%,50%)`}
//                     />
//                   )
//                 })}
//               </div>
//             </div>
//           </section>

//           <section className="transactionContainer">
//             <div className="genderChart">
//               <h2>Gender Ratio</h2>
//               <Doughnutchart labels={["Female", "Male"]} data={[datadashBoard.stats.genderRatio.female,datadashBoard.stats.genderRatio.male]} backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]} cutout={90}/>
//               <p><BiMaleFemale/></p>
//             </div>
//             {/* table .................................. */}
//             <Dashboardtable data={datadashBoard.stats.latestTransaction}/>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// interface widgetitemprops {
//   heading: string;
//   value: number;
//   percent: number;
//   color: string;
//   amount?: boolean;
// }

// const Widgetitem = ({
//   heading,
//   value,
//   percent,
//   color,
//   amount = false,
// }: widgetitemprops) => (
//   <article className="widget">
//     <div className="widgetinfo">
//       <p>{heading}</p>
//       <h4>{amount ? `$${value}` : value}</h4>
//       {percent > 0 ? (
//         <span className="green">
//           <HiTrendingUp /> + {percent}%{" "}
//         </span>
//       ) : (
//         <span className="red">
//           <HiTrendingDown /> {percent}%{" "}
//         </span>
//       )}
//     </div>
//     <div
//       className="widgetcircle"
//       style={{
//         background: `conic-gradient(${color} ${
//           (Math.abs(percent) / 100) * 360
//         }deg, rgb(255, 255, 255) 0)`, 
//       }}
//     >
//       <span style={{ color: `${color}` }}> {percent}% </span>
//     </div>
//   </article>
// );
// interface catogaryitemprops {
//   heading: string;
//   value: number;
//   color: string;
// }
// const Catogaryitem = ({ heading, value, color }: catogaryitemprops) => (
//   <div className="catogoriesitem">
//     <h5>{heading}</h5>
//     <div>
//       <div style={{ backgroundColor: color, width: `${value}%` }}></div>
//     </div>
//     <span>{value}%</span>
//   </div>
// );

// export default Dashboard;
