import React, { useEffect, useState } from "react"
import Sidebar from "../../../components/admincomponents/Sidebar"
import '../../../style/adminstles/app.scss'
// import img from '../../../assets/adminimages/user.png'
import { useDeleteproductMutation, useProductsDetailsQuery, useUpdateproductMutation } from "../../../redux/api/productapi"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { userReducerinitailstate } from "../../../types/reducer-types"
import { responseToast } from "../../../utils/features"
// import { Product } from "../../../types/types"
const  ProductManagement= () => { 
  const {user} = useSelector((state:{userReducer: userReducerinitailstate}) => state.userReducer);
  console.log(user?._id)
  const params = useParams()
  const navigate = useNavigate();
  const {data,isError} = useProductsDetailsQuery(params.id!)
  console.log(data)
  // const product = data?.message;
  const [productdata, setproductdata] = useState({
    name: "",
    category: "",
    photo: "",
    price: 0,
    stock:0,
    _id: ""
  })

  useEffect(()=>{
    //  data?.message
    if(data){
      setproductdata(data.message)
    }
},[data])

useEffect(() => {
  setinput(productdata); // Update inp state when productdata changes
}, [productdata])

    const [inp, setinput] = useState<{name:string,category:string,price:number,stock:number,photo:string,_id:string}>({
       name: productdata.name,
       price: productdata.price,
       stock: productdata.stock,
       photo: productdata.photo,
       category: productdata.category,
       _id: productdata._id
    })

  
    const handleinput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name;
        const val = e.target.value;
        setinput((preval)=>{
            return {...preval, [name]:val}
        })
    }

  const [updateproduct] = useUpdateproductMutation()
  const [deleteproduct] = useDeleteproductMutation()


    const handleFileChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
      const file: File | undefined =e.target.files?.[0];
      const reader: FileReader = new FileReader();
      if(file){
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
          if(typeof reader.result === 'string'){
            const result = reader.result as string;
            setinput((preval) => {
              return { ...preval, photo: result };
            })
          }
        }
      } 
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      if(inp.name) formData.set("name", inp.name);
      if(inp.stock) formData.set("stock", inp.stock.toString());
      if(inp.category) formData.set("category", inp.category);
      if(inp.price) formData.set("price", inp.price.toString());
      if(inp.photo) formData.set("photo", inp.photo);

      const res = await updateproduct({_id: productdata._id,userID: user?._id as string, formData})
      responseToast(res,navigate,"/admin/products")
    };
   //  {console.log(inp.photo)}

   const DelteproductHandler = async () => {
    
    const res = await deleteproduct({userID: user?._id as string,_id: productdata?._id })
    responseToast(res,navigate,"/admin/products")
  };
   
 if (isError) return <Navigate to={'/404'}/>
  

  return (
    <>
      <div className="admincontainer">
      <Sidebar/>
      <main className="productmanagement">
      <section>
          <strong>{productdata?._id}</strong>
         { inp.photo && <img src={`http://localhost:3000/${inp.photo}`} alt="selected photo"/>} <br />
         <p> hello {inp.name}</p>
         {
          inp.stock>0? (<span className="green">{inp.stock}Available</span>):(<span className="red">Not Available</span>)
         }
         <h3>Rs {inp.price}</h3>
        </section>
        <article>
          <button className="product-delelte-btn" onClick={DelteproductHandler}>Delete Product</button>
            <form onSubmit={handleSubmit}>
                <h2>Manage Product</h2>
                 <div>
                    <label htmlFor="Newproduct">Name</label>
                    <input  type="text" name="name" value={inp.name} onChange={(e)=> handleinput(e)} placeholder="Name of product here" />
                 </div>
                 <div>
                    <label htmlFor="price">Price</label>
                    <input  type="number" name="price" value={inp.price === 0 ? '' : inp.price} onChange={(e)=> handleinput(e)} placeholder="Price of the product" />
                 </div>
                 <div>
                    <label htmlFor="stock">Stock</label>
                    <input  type="number" name="stock" value={inp.stock === 0 ? '' : inp.stock} onChange={(e)=> handleinput(e)} placeholder="Stoduct product" />
                 </div>
                 <div>
                    <label htmlFor="category">Category</label>
                    <input  type="text" name="category" value={inp.name} onChange={(e)=> handleinput(e)} placeholder="Name of product here" />
                 </div>
                 <div>
                    <label htmlFor="photo">Photo</label>
                    <input  type="file" name="photo" onChange={handleFileChange} placeholder="paste photo here" />
                 </div>
                 {inp.photo && <img src={`http://localhost:3000/${inp.photo}`} alt="selected photo"/>}
                 <button type="submit" >Update</button>
            </form>
        </article>
       
      </main>
      </div>
    </>
  )
}


export default ProductManagement
