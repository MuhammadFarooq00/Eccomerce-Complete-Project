import { Link } from "react-router-dom"
import Productcart from "../components/Productcart"
import { useLatestproductsQuery } from "../redux/api/productapi"
import toast from "react-hot-toast"
import  { SkeletonLoader } from "../components/loader"
import { cartItems } from "../types/types"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/reducer/cartreducer"
// import { Product } from "../types/types"


const Home = () => {
    const {data, isLoading,isError} = useLatestproductsQuery("")
    const dispatch = useDispatch();
  const addtocarthandler = (cartitem:cartItems)=>{
     if(cartitem.stock < 1) toast.error("out Of stock");
     dispatch(addToCart(cartitem))
     toast.success("add to cart successfully")
  }
    // console.log(data?.message[0])

    if(isError){
      toast.error("cannot fetch the products");
    }

  return (
    <>
       <div className="home">
        <section>
        
        </section>
       <h1>Latest Products <Link to='/search' className="findmore">More</Link></h1>
       <main>
        {isLoading? <SkeletonLoader/>: data?.message.map((val)=> { 
          return (<Productcart key={val._id} productID={val._id} name={val.name} price={val.price} stock={val.stock} handler={addtocarthandler} photo={val.photo}/>)
        })}
        </main>
       </div>
    </>
  )
}

export default Home
