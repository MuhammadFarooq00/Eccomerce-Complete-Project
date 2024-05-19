import { ReactElement, useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import Sidebar from "../../components/admincomponents/Sidebar";
import TableHoc from "../../components/admincomponents/TableHoc";
import "../../style/adminstles/app.scss";
// import { RiDeleteBin3Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CostomError } from "../../types/api-types";
import { userReducerinitailstate } from "../../types/reducer-types";

interface datatype {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}
const columns: Column<datatype>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

// const arr: datatype[] = [
//   {
//     user: "Xavior",
//     amount: 4550,
//     discount: 325,
//     quantity: 3,
//     status: <span style={{ color: "red" }}>processing</span>,
//     action: <Link to="/admin/transactions/dsfadf">Manage</Link>,
//   },
//   {
//     user: "Xavior",
//     amount: 4550,
//     discount: 325,
//     quantity: 3,
//     status: <span style={{ color: "green" }}>delivered</span>,
//     action: <Link to="/admin/transactions/dsfadf">Manage</Link>,
//   },
// ];

const Transactions = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerinitailstate }) => state.userReducer
  );

  const { data, isError, error,isFetching } = useAllOrdersQuery(user?._id as string);
  console.log(data?.orders)
  const [row, setrow] = useState<datatype[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data){
      console.log(data)
      setrow(
        data?.orders.map((i) => ({
          user: typeof i.user === 'object' && i.user !== null ? i.user.name : "Unknown User",
          // user: i.user, 
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
          action: <Link to={`/admin/transactions/${i._id}`}>Manage</Link>,
        }))
      );}
    setIsLoading(false)
  }, [data]);

  console.log(row)
  if (isError) toast.error((error as CostomError).data.message);


  const table = useCallback(
    () =>
      TableHoc<datatype>(
        columns,
        row,
        "dashboardproductbox",
        "Transactions",
        true
      )(),
    [row]
  );

  return (
    <>
    {isLoading} <div className="admincontainer">
        <Sidebar />
        <main>
          {isFetching ? (
            <p>Loading Transactions...</p>
          ) : data?.orders.length === 0 ? (
            <p>No Transactions Found</p>
          ) : (
            table()
          )}
        </main>
      </div>
      {/* <div className="admincontainer">
        <Sidebar />
        <main>{table()}</main>
      </div> */}
    </>
  );
};

export default Transactions;
