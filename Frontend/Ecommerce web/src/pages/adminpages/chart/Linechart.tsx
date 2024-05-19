import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LineChart } from "../../../components/admincomponents/Charts";
import Sidebar from "../../../components/admincomponents/Sidebar";
import { useLineQuery } from "../../../redux/api/dashboard";
import "../../../style/adminstles/app.scss";
import { CostomError } from "../../../types/api-types";
import { userReducerinitailstate } from "../../../types/reducer-types";
import { getLastmonth } from "../../../utils/features";

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','august','september',"october",'november','december'];

const Linechart = () => {
     
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );
  const { data, isError, error } = useLineQuery(user?._id as string);

  useEffect(() => {
    if (isError) {
      const err = error as CostomError;
      toast.error(err.data.message);
    } else if (data) {
      console.log(data.LineChartStat);
      setLoading(false);
    }
  }, [data, error, isError]);

  const {get12Months} = getLastmonth();
   

  return (
    <>
      {loading} <div className="admincontainer">
        <Sidebar />
        <main className="chartContainer">
        <h1>Line Charts</h1>
        <section>
            {data &&<LineChart label='user' data={data.LineChartStat.users} borderColor='hsl(53,80%,40%)' backgroundColor="rgba(53,162,255,0.5)" labels={get12Months}/> }
               <h2 style={{letterSpacing: '2px'}}>Active Users</h2>
        </section>
        <section>
            {data && <LineChart label='Total Product' data={data.LineChartStat.products} borderColor='hsl(129,80%,40%)' backgroundColor="hsla(249,90%,10%,0.4)" labels={get12Months}/>}
            <h2 style={{letterSpacing: '2px'}}>Total Product (SQU)</h2>
        </section>
        <section>
            {data && <LineChart label='Revenue' data={data.LineChartStat.revenue} borderColor='hsl(129,80%,10%)' backgroundColor="hsla(160,60%,35%,0.8)" labels={get12Months}/>}
            <h2 style={{letterSpacing: '2px'}}>Total Revenue</h2>
        </section>
        <section>
            {data && <LineChart label='discount' data={data.LineChartStat.discount} borderColor='hsl(129,80%,40%)' backgroundColor="hsla(29,80%,40%,0.4)" labels={get12Months}/>}
         <h2 style={{letterSpacing: '2px'}}>Discount Allotted</h2>
        </section>
        </main>
        </div>
    </>
  )
}

export default Linechart
