import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUP/SignUp";
import WishList from "./pages/WishList/WishList";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LogIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/wishList" element={<WishList/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
      {/* <LogIn></LogIn> */}
    </div>
  );
}

export default App;
