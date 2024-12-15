import React from 'react';
import "./error.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RedButton from "../../components/RedButton/RedButton";

function Error() {
  return (
    <>  
    <Header/>
    <div className='navigate'>
      <div className="navigate-panel">
      <a href="#"> Home / </a>
      <a href="#">404 Error</a>
        </div>
    </div>
      <div className='not-found'>404 Not Found</div>
      <div className='not-found-p'>Your visited page not found.You may go home page.</div>
      <div className='back-home'>
        <RedButton text="Back to home page"></RedButton>
      </div>
    
    <Footer/>
  </>
  )
}

export default Error

