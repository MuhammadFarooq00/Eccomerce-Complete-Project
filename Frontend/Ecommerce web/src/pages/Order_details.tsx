import { useParams } from "react-router-dom"

const Order_details = () => {
    const {id} = useParams();
  return (
    <>
      <h3>Order Details {id}</h3>
    </>
  )
}

export default Order_details
