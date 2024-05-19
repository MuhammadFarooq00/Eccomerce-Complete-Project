import { useEffect, useState } from "react";
import { BarChart } from "../../../components/admincomponents/Charts"
import Sidebar from "../../../components/admincomponents/Sidebar"
import "../../../style/adminstles/app.scss"
import { useSelector } from "react-redux";
import { userReducerinitailstate } from "../../../types/reducer-types";
import { useBarQuery } from "../../../redux/api/dashboard";
import { CostomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { getLastmonth } from "../../../utils/features";
// import '../../../style/adminstles/chartsstyle.scss'

// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','august','september',"october,'november",'december'];

const Barchart = () => {
  
  const [loading, setLoading] = useState(true);
  const {get6Months,get12Months} = getLastmonth();
  console.log(get6Months,get12Months)
  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );
  const { data, isError, error } = useBarQuery(user?._id as string);

  useEffect(() => {
    if (isError) {
      const err = error as CostomError;
      toast.error(err.data.message);
    } else if (data) {
      console.log(data.BarChartStat);
      setLoading(false);
    }
  }, [data, error, isError]);

   console.log(data)
  return (
    <>
      {loading}<div className="admincontainer">
        <Sidebar />
        <main className="chartContainer">
        <h1>Bar Chart</h1>
        <section>
            {data && <BarChart data_1={data.BarChartStat.products} data_2={data.BarChartStat.users} title_1="Products" title_2="Users" bg_color1={`hsl(260,50%,30%)`} bg_color2={`hsl(360,90%,90%)`} labels={get6Months}/>}
            <h2 style={{letterSpacing: '2px'}}>Top Sellings & Top Customers</h2>
        </section>
        <section>
            {data && <BarChart horizontal={true} data_1={data.BarChartStat.orders} data_2={[]} title_1="Orders" title_2="" bg_color1={`hsl(260,50%,30%)`} bg_color2='' labels={get12Months}/>}
            <h2 style={{letterSpacing: '2px'}}>Orders Throughout the year</h2>
        </section>
        </main>
        </div>
    </>
  )
}

export default Barchart
