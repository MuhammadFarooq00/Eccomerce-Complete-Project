import React, { FormEvent, useState } from "react"
import Sidebar from "../../../components/admincomponents/Sidebar"
import '../../../style/adminstles/app.scss'
import { useNewproductMutation } from "../../../redux/api/productapi"
import { useSelector } from "react-redux"
import { userReducerinitailstate } from "../../../types/reducer-types"
import toast from "react-hot-toast"
import { responseToast } from "../../../utils/features"
import { useNavigate } from "react-router-dom"
// import { CostomError } from "../../../types/api-types"

const Newproduct = () => {
  const {user} = useSelector((state:{userReducer: userReducerinitailstate}) => state.userReducer);
  const navigate = useNavigate()
    const [inp, setinput] = useState<{name:string,price:number,category:string,stock:number,photo:File | null}>({
       name:'',
       price: 0,
       stock: 0,
       category: '',
       photo: null,

    })
    if(!user?._id) toast.error("User not Existed Make sure you are login first")
    const [Newproduct] = useNewproductMutation()


    const handleinput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name;
        const val = e.target.value;
        setinput((preval)=>{
            return {...preval, [name]:val}
        })
    }
    const handleFileChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
      const file = e.target.files && e.target.files[0];
      setinput((preval) => {
         return { ...preval, photo: file };
       })
    }
    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const handleSubmit =async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!inp.name || !inp.price || !inp.stock || !inp.photo || !inp.category) return;

      const formData = new FormData();
      formData.set("name", inp.name);
      formData.set("stock", inp.stock.toString());
      formData.set("category", inp.category);
      formData.set("price", inp.price.toString());
      formData.set("photo", inp.photo);

      const res = await Newproduct({_id: user?._id as string, formData})

      responseToast(res,navigate,"/admin/products")

    };
   //  {console.log(inp.photo)}
  return (
    <>
      <div className="admincontainer">
      <Sidebar/>
      <main className="productmanagement">
        <article>
            <form onSubmit={handleSubmit}>
                <h2>New Product</h2>
                 <div>
                    <label htmlFor="Newproduct">Name</label>
                    <input required type="text" name="name" value={inp.name} onChange={(e)=> handleinput(e)} placeholder="Name of product here" />
                 </div>
                 <div>
                    <label htmlFor="price">Price</label>
                    <input required type="number" name="price" value={inp.price === 0 ? '' : inp.price.toString()} onChange={(e)=> handleinput(e)} placeholder="Price of the product" />
                 </div>
                 <div>
                    <label htmlFor="stock">Stock</label>
                    <input required type="number" name="stock" value={inp.stock === 0 ? '' : inp.stock.toString()} onChange={(e)=> handleinput(e)} placeholder="Stock product" />
                 </div>
                 <div>
                    <label htmlFor="category">Category</label>
                    <input required type="text" name="category" value={inp.category} onChange={(e)=> handleinput(e)} placeholder="category" />
                 </div>
                 <div>
                    <label htmlFor="photo">Photo</label>
                    <input required type="file" name="photo" onChange={handleFileChange} placeholder="paste photo here" />
                     {inp.photo && <div>Selected File: {inp.photo.name}</div>}
                 </div>
                 {inp.photo && <img src={URL.createObjectURL(inp.photo)} alt="selected photo"/>}
                 <button type="submit" >Submit</button>
            </form>
        </article>
      </main>
      </div>
    </>
  )
}

export default Newproduct
