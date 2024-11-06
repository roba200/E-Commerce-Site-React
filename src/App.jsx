import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUP/SignUp";
import WishList from "./pages/WishList/WishList";
import CheckOut from "./pages/CheckOut/CheckOut";
import Account from "./pages/Account/Account";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LogIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/wishList" element={<WishList/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/account" element={<Account/>}/>

        </Routes>
      </BrowserRouter>
      {/* <LogIn></LogIn> */}
    </div>
  );
}

export default App;
