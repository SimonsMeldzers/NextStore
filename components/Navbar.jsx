import Link from 'next/link';
import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className='logo'>
        <Link href='/'> Next Store </Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => showCart === true ? setShowCart(false) : setShowCart(true)}>
        <ShoppingBagIcon/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar;