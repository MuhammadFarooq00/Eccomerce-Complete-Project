import { Column } from "react-table";
import TableHoc from "./TableHoc"

interface datatype{
    _id: string;
    quantity: number;
    discount: number;
    amount: number;
    status: string;
}

const columns:Column<datatype>[] = [
     {
        Header: "Id",
        accessor: "_id",
     },
     {
        Header: "Quantity",
        accessor: "quantity"
     },
     {
        Header: "Discount",
        accessor: 'discount',
     },
     {
        Header: "Amount",
        accessor: "amount",
     },
     {
        Header: "Status",
        accessor: "status",
     },
]

const Dashboardtable = ({data}: {data:datatype[]}) => {

//   return TableHoc<datatype>(columns,data, 'transactionbox', 'Toptransaction')()
  return <TableHoc<datatype> columns={columns} data={data} containerclassname="transactionbox" heading="Toptransaction"/>
}

export default Dashboardtable
