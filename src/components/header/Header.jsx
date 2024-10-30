import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <section className="h-wrapper">
        <div className="h-container">
            <img src="./logo.png" alt="logo" width={100}/>
            <div className="h-menu">
                <a href="">Home</a>
                <a href="">Contact</a>
                <a href="">About</a>
                <a href="">Sign Up</a>
            </div>

            <div className="search-input">
            <input type="text" placeholder="What are you looking for?"/>
            <img src="./mag-glass.png" alt="" className='magnifying-glass'/>
            </div>
        </div>
        <div className="line"></div>
    </section>
  )
}

export default Header

