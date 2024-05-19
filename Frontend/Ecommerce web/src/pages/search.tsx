import { useState } from "react"
import Productcart from "../components/Productcart";
import { useCategoriesQuery, useSearchproductsQuery } from "../redux/api/productapi";
import toast from "react-hot-toast";
import { CostomError } from "../types/api-types";
import { SkeletonLoader } from "../components/loader";
import { cartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartreducer";
import { useDispatch } from "react-redux";


const Search = () => {
   const {data: categoriesResponse, isError,error,isLoading} = useCategoriesQuery("");
  const [search, setsearch] = useState("");
  const [sort,setsort] = useState("");
  const [price,setprice] = useState(100000);
  const [category,setcategory] = useState("");
  const [page, setpage] = useState(1);

  const {data:searchdata,isError:searchError} = useSearchproductsQuery({search,sort,price,category,page})

    console.log(searchdata?.products)
   const isnextpage = page < 4;
   const isprevpage = page > 1;

  if(isError) toast.error((error as CostomError).data.message)
  if(searchError) toast.error((error as CostomError).data.message)
  console.log(categoriesResponse?.message)

  const dispatch = useDispatch();

  const addtocarthandler = (cartitem:cartItems)=>{
    if(cartitem.stock < 1) toast.error("out Of stock");
    dispatch(addToCart(cartitem))
    toast.success("add to cart successfully")
 }
    return (
      <>
        <div className="productsearchpage">
          <aside>
             <h2>Filters</h2>
             <div>
              <h4>Sort</h4>
              <select value={sort} onChange={(e)=> setsort(e.target.value)}>
                <option value="">None</option>
                <option value="asc">Price (Low to high)</option>
                <option value="dsc">Price (High to low)</option>
              </select>
             </div>
             <div>
              <h4>Price Price: {price || ""}</h4>
              <input type="range" value={price} min={100} step={100} max={100000} onChange={(e)=> setprice(Number(e.target.value))}/>
             </div>
             <div>
              <h4>Category</h4>
              <select value={category} onChange={(e)=> setcategory(e.target.value)}>
                <option value="">All</option>
                {categoriesResponse?.message.map((val,ind)=>(<option key={ind} value={val}>{val.toUpperCase()}</option>))}
              </select>
             </div>
          </aside>
        <main>
            <h1>products</h1>
            <input type="text" placeholder="Search by name" value={search} onChange={(e)=> setsearch(e.target.value)}/>
         <div className="searchProductlist">
             {isLoading? <SkeletonLoader/>: searchdata?.products.map((val)=>(<Productcart key={val._id} productID={val._id} handler={addtocarthandler} name={ val.name} price={val.price} stock={val.stock} photo={val.photo} />))}
         </div>
         {searchdata?.totalpage as number > 1 && (<article>
          <button disabled={!isprevpage} onClick={()=> setpage((prev)=>prev-1)}>prev</button>
          <span>{page} of {searchdata?.totalpage}</span>
          <button disabled={!isnextpage} onClick={()=>setpage((prev)=>prev+1)}>Next</button>
         </article>)}
        </main>
        </div>
      </>
    )
  }
  
  export default Search
  