import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useEffect, useState } from 'react';
import { UserProvider } from "./UserContext";
import AdminPage from "./pages/AdminPage";
import AllOrders from "./pages/AllOrders"
import AppNavbar from "./component/AppNavbar";
import Cart from "./pages/Cart";
import CreateProduct from "./pages/CreateProduct";
import Footer from "./component/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound"
import Products from "./pages/Products";
import ProductView from "./component/ProductView";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SetUserAdmin from "./pages/SetUserAdmin";
import ThankYou from "./pages/ThankYou";
import UserOrderView from "./pages/UserOrderView";


function App() {
  const [user, setUser] = useState({ access: localStorage.getItem("token") });

  const unsetUser = () => {
    localStorage.clear();
  }
  useEffect(() => {
    fetch(`${
      process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {

      if (typeof data.user !== "undefined"){

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
          userFirstName: data.user.firstName
        });

      } else {

        setUser({
          id: null,
          isAdmin: null,
          userFirstName: null

        })

      }

    })


  }, []);
  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      
    <Router>  
      <AppNavbar/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/adminpage" element={<AdminPage />}/>
        <Route path="/createproduct" element={<CreateProduct />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/products/:productId" element={<ProductView />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/thankyou" element={<ThankYou/>} />
        <Route path="/usertoadmin" element={<SetUserAdmin/>}/>
        <Route path="/allorders" element={<AllOrders/>}/>
        <Route path="/userorderviews" element={<UserOrderView />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
      <Footer/>
    </Router> 
  
    </UserProvider>
  );
}

export default App;
