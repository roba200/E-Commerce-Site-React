 import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUP/SignUp";
import WishList from "./pages/WishList/WishList";
<<<<<<< HEAD
import HomePage from "./pages/HomePage/HomePage";
=======
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Account from "./pages/Account/Account";
import Error from "./pages/Error/Error";
>>>>>>> a29b51c87c0167b4ef2acc9e35c50d0e04af8378

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LogIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/wishList" element={<WishList/>}/>
<<<<<<< HEAD
          <Route path="/homepage" element={<HomePage/>}/>
=======
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/error" element={<Error/>}/>
>>>>>>> a29b51c87c0167b4ef2acc9e35c50d0e04af8378
        </Routes>
      </BrowserRouter>
      {/* <LogIn></LogIn> */}
    </div>
  );
}

export default App;
