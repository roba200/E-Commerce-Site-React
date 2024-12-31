import React from 'react'
import './WhiteButton.css'

const WhiteButton = ({text ,onClick}) => {
  return (
    <button type="button" className='white-button' onClick={onClick}>{text}</button>
  )
}

export default WhiteButton
