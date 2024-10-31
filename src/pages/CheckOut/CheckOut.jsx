import React from 'react'
import './CheckOut.css'

function CheckOut() {
  return (
    <>
    <div className="navigate-panel">
        <ul>
            <li><a href=''>Account /</a></li>
            <li><a href=''>My Account /</a></li>
            <li><a href=''>Product  /</a></li>
            <li><a href=''>View Cart  /</a></li>
            <li><a href=''>CheckOut </a></li>
        </ul>
    
    </div>
    <div className='title'>
        <h2>Billing Details</h2>
    </div>
    <div className='container'>
        <table className='table1' border={0}>
            <tr>
                <td>
                First Nameg
                     <br />g
                <input type="text" name="Fname" required />
                </td>
                <td>
                    <table className='table2' border={0}>
                    hyug9u-9<input type="text" name="Fname" required />  
                </table>
                
                </td>
            </tr>

        </table>

    </div>
    </>
  )
}

export default CheckOut
