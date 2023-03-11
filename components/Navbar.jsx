import Link from 'next/link';
import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Navbar() {
  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href='/'> Next Store </Link>
      </p>
      <button type='button' className='cart-icon' onClick=''>
        <ShoppingBagIcon/>
        <span className='cart-item-qty'>2</span>
      </button>
    </div>
  )
}

export default Navbar;