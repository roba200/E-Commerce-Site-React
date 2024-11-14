import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUP/SignUp";
import WishList from "./pages/WishList/WishList";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Contact from "./pages/Contact/Contact"
import About from "./pages/About/About"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LogIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/wishList" element={<WishList/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
      {/* <LogIn></LogIn> */}
    </div>
  );
}

export default App;
