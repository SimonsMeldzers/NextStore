import Link from 'next/link';
import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function Navbar() {
  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href='/'> Next Store </Link>
      </p>
      <button type='button' className='cart-icon' onClick=''>
        <ShoppingBasketIcon/>
      </button>
    </div>
  )
}

export default Navbar;