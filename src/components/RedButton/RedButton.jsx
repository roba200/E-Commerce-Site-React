import React from 'react'
import './RedButton.css'

const Redbutton = ({text,onClick}) => {
  return (
    <button type="submit" className='red-button' onClick={onClick}>{text}</button>
   
  );
}

export default Redbutton

