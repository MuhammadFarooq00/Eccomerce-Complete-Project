import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import TableHoc from "../components/admincomponents/TableHoc";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { CostomError } from "../types/api-types";
import { userReducerinitailstate } from "../types/reducer-types";
import { Link } from "react-router-dom";

type typedata ={
   _id: string;
   amount: number;
   quantity: number;
   discount: number;
   status: ReactElement;
   action: ReactElement;
}
const column:Column<typedata>[]= [
{
    Header: "ID",
    accessor: "_id"
},
{
  Header: "Amount",
  accessor: "amount"
},
{
  Header: "Quantity",
  accessor: "quantity"
},
{
  Header: "Discount",
  accessor: "discount"
},
{
  Header: "Status",
  accessor: "status"
},
{
  Header: "Action",
  accessor: "action"
}
]
const Order = () => {

  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );

  const { data, isError, error } = useMyOrdersQuery(user?._id as string);

  const [rows,setrow]= useState<typedata[]>([
  //   {_id: "abssf",
  //  amount: 5000,
  //  quantity: 3,
  //  discount: 300,
  //  status: <span className="red">Processing</span>,
  //  action: <Link to={`/orders/adsasda`}>View</Link>}
  ])

  if (isError) toast.error((error as CostomError).data.message);

  useEffect(() => {
    console.log(data?.orders);
    if (data)
      setrow(
        data?.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "processing"
                  ? "red"
                  : i.status === "shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);



  const table = TableHoc<typedata>(column,rows,"Dashboard-Product-Box", "Order",rows.length>6)()
  return (
    <>
      <div className="container">
        <h1>My orders</h1>
        {table}
      </div>
    </>
  )
}

export default Order
