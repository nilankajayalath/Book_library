import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Addbook from "./pages/Addbook"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers"
import RedirectUnAuthenticatedUsers from "./providers/RedirectUnAuthenticatedUsers"
import Footer from "./components/Footer"
import Bookpage from "./pages/Bookpage"

function App() {
  const {fetchUser,fetchingUser} = useAuthStore();
  useEffect(()=>{
    fetchUser();
  },[fetchUser]);

  if(fetchingUser){
    return <p>Loading...</p>;
  }

  return (
    <>
    <Toaster />
    <Navbar />
      
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/add-book"} element={<RedirectUnAuthenticatedUsers><Addbook /></RedirectUnAuthenticatedUsers>} />
        <Route path={"/login"} element={<RedirectAuthenticatedUsers><LoginPage /></RedirectAuthenticatedUsers>} />
        <Route path={"/signup"}  element={<RedirectAuthenticatedUsers><SignupPage /></RedirectAuthenticatedUsers>} />
        <Route path="/book/:id" element={<Bookpage />} />
      </Routes>
       
        
      <Footer />
    </>
  )
}

export default App
