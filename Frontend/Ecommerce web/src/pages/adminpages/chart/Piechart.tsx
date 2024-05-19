import {
  Doughnutchart,
  PieChart,
} from "../../../components/admincomponents/Charts";
import Sidebar from "../../../components/admincomponents/Sidebar";
import "../../../style/adminstles/app.scss";
// import '../../../style/adminstles/chartsstyle.scss'
import { categories } from "../../../assets/adminimages/data.json";
import { useSelector } from "react-redux";
import { userReducerinitailstate } from "../../../types/reducer-types";
import { usePieQuery } from "../../../redux/api/dashboard";
import { CostomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const Piechart = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );
  const { data, isError, error } = usePieQuery(user?._id as string);

  useEffect(() => {
    if (isError) {
      const err = error as CostomError;
      toast.error(err.data.message);
    } else if (data) {
      console.log(data.PieChartStats);
      setLoading(false);
    }
  }, [data, error, isError]);

  return (
    <>
      {loading} 
        <div className="admincontainer">
          <Sidebar />
          <main className="chartContainer">
            <h1>Pie Doughnut & Charts</h1>
            <section>
              <div>
                {data && <PieChart
                  labels={["processing", "shipped", "delivered"]}
                  data={[data.PieChartStats.OrderedFullfillment.Processed,
                    data.PieChartStats.OrderedFullfillment.shipped,
                    data.PieChartStats.OrderedFullfillment.delivered,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,80%)",
                    "hsl(110,80%,50%)",
                    "hsl(110,40%,50%)",
                  ]}
                  offset={[0, 0, 50]}
                />}
              </div>
              <h2 style={{ letterSpacing: "2px" }}>Order fulfilment Ratio</h2>
            </section>
            <section>
              <div>
                {data && <Doughnutchart
                  labels={data.PieChartStats.ProductCategoryCount.map((i) => Object.keys(i)[0])}
                  data={data.PieChartStats.ProductCategoryCount.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map(
                    (i) => `hsl(${i.value * 4},${i.value * 2}%,50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 50]}
                />}
              </div>
              <h2 style={{ letterSpacing: "2px" }}>Product Catogories Ratio</h2>
            </section>
            <section>
              <div>
                {data && <Doughnutchart
                  labels={["In stock", "Out of stock"]}
                  data={[data.PieChartStats.StockAvailability.Instock,
                    data.PieChartStats.StockAvailability.productOutofstock
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53,162,255)"]}
                  legends={false}
                  offset={[0, 50]}
                  cutout={"70%"}
                />}
              </div>
              <h2 style={{ letterSpacing: "2px" }}>Stock Availabilty</h2>
            </section>
            <section>
              <div>
                {data && <Doughnutchart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[data.PieChartStats.RevnueDistribution.MarketingCost,
                    data.PieChartStats.RevnueDistribution.totalDiscount,
                    data.PieChartStats.RevnueDistribution.burnt,
                    data.PieChartStats.RevnueDistribution.productionCost,
                    data.PieChartStats.RevnueDistribution.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53,162,256)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />}
              </div>
              <h2 style={{ letterSpacing: "2px" }}>Revenue Distribution</h2>
            </section>
            <section>
              <div>
                {data && <PieChart
                  labels={[
                    "Teenager Below(20)",
                    "Adult(20-40)",
                    "Older above 40",
                  ]}
                  data={[data.PieChartStats.UserageGroup.teen,data.PieChartStats.UserageGroup.adult,data.PieChartStats.UserageGroup.old]}
                  backgroundColor={[
                    "hsl(10,80%,80%)",
                    "hsl(10,80%,50%)",
                    "hsl(10,40%,50%)",
                  ]}
                  offset={[0, 0, 50]}
                />}
              </div>
              <h2 style={{ letterSpacing: "2px" }}>Users Age Group</h2>
            </section>
            <section>
              <div>
                {data && <Doughnutchart
                  labels={["Admins", "Customers"]}
                  data={[
                    data?.PieChartStats.AdminCustomer.admin,
                    data?.PieChartStats.AdminCustomer.customer,
                  ]}
                  backgroundColor={["hsl(335,80%,40%)", "rgb(44,162,255)"]}
                  offset={[0, 50]}
                  cutout={"60%"}
                />}
              </div>
            </section>
          </main>
        </div>
      )
    </>
  );
};

export default Piechart;
