/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './style/app.scss'
// import './style/adminstles/app.scss'
import { Suspense, lazy, useEffect } from 'react'
import Loader from './components/loader'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import { getUser } from './redux/api/userapi'
import { userReducerinitailstate } from './types/reducer-types'
import ProtectedRoute from './components/protected-route'
const Home = lazy(()=> import('./pages/home'))
const Search = lazy(()=> import('./pages/search'))
const Cart = lazy(()=> import('./pages/cart'))
const Shipping = lazy(()=> import('./pages/Shipping'))
const Login = lazy(()=> import('./pages/Login'))
const Order = lazy(()=>import('./pages/Order'))
const Order_details = lazy(()=>import('./pages/Order_details'))
const Notfound = lazy(()=> import('./pages/not-found'))

// admin panel ...............................................................

const Dashboard = lazy(()=> import('./pages/adminpages/Dashboard'))
const Transactions = lazy(()=> import('./pages/adminpages/Transactions'))
const CheckOut = lazy(()=> import('./pages/CheckOut'))
const Customer = lazy(()=> import('./pages/adminpages/Customer'))
const Product = lazy(()=> import('./pages/adminpages/Product'))
// managemnt .................................................................
const Newproduct = lazy(()=>import('./pages/adminpages/management/Newproduct'))
const ProductManagement = lazy(()=>import('./pages/adminpages/management/ProductManagement'))
const TransactionMangement = lazy(()=>import('./pages/adminpages/management/TransactionMangement'))

//charts section ..........................................................
const Barchart = lazy(()=> import('./pages/adminpages/chart/Barchart'))
const Linechart = lazy(()=> import('./pages/adminpages/chart/Linechart'))
const Piechart = lazy(()=> import('./pages/adminpages/chart/Piechart'))

//Apps section ..........................................................

const StopWatch = lazy(()=> import('./pages/adminpages/apps/StopWatch'))
const CouponApp = lazy(()=> import('./pages/adminpages/apps/CouponApp'))
const TossApp = lazy(()=> import('./pages/adminpages/apps/TossApp'))


function App() {
  const {user, loading} = useSelector((state: {userReducer: userReducerinitailstate})=> state.userReducer)
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=> {
      if(user){
        console.log("Logged in")
        const data = await getUser(user.uid)
        dispatch(userExist(data.message))
        console.log(data.message)
      } 
      else {
        dispatch(userNotExist())
      }
    })
  },[])

  return loading? <Loader/> : (
    <>
      <BrowserRouter>
         <Header user={user}/>   
        <Suspense fallback={<Loader/>}>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/search' element={<Search/>}/>
           <Route path='/cart' element={<Cart/>}/>
           <Route path='/login' element={<ProtectedRoute isAuthenticated={user? false: true}>
            <Login/>
           </ProtectedRoute>}/>
           <Route element={<ProtectedRoute isAuthenticated={user? true:false}/>}>
           <Route path='/shipping' element={<Shipping/>}/>
           <Route path='/orders' element={<Order/>}/>
           <Route path='/orders/:id' element={<Order_details/>}/>
           <Route path='/shipping/pay' element={<CheckOut/>}></Route>
           </Route>
           {/* <Route path='*' element={<Notfound/>}></Route> */}
        {/* </Routes>
        </Suspense> */}
      
         {/* admin panel .................... */}

        {/* <Suspense fallback={<Loader/>}>
        <Routes> */}

          <Route element={<ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={user?.role==="admin" ? true : false}/>}>
          
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/transactions' element={<Transactions/>}/>
          <Route path='/admin/products' element={<Product/>}/>
          <Route path='/admin/customers' element={<Customer/>}/>
           
           {/* charts  */}
 
          <Route path='/admin/chart/bar' element={<Barchart/>}></Route>
          <Route path='/admin/chart/line' element={<Linechart/>}></Route>
          <Route path='/admin/chart/pie' element={<Piechart/>}></Route>

           {/* mini apps */}

          <Route path='/admin/app/stopwatch' element={<StopWatch/>}/>
          <Route path='/admin/app/coupon' element={<CouponApp/>}/>
          <Route path='/admin/app/toss' element={<TossApp/>}/>

           {/* management routes ........................ */}
           <Route path='/admin/products/new' element={<Newproduct/>}></Route>
           <Route path='/admin/products/:id' element={<ProductManagement/>}></Route>
           <Route path='/admin/transactions/:id' element={<TransactionMangement/>}></Route>
           </Route>
           
           <Route path='*' element={<Notfound/>}></Route>
         
        </Routes>
        </Suspense>
        <Toaster position="top-right"/>
      </BrowserRouter>
    </>
  )
}

export default App
