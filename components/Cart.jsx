import React, { useRef } from 'react'
import Link from 'next/link';
import toast from 'react-hot-toast'
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Cart() {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type='button'
        className='cart-heading'
        onClick={() => setShowCart(false)}
        >
          <span className='heading'> {`${'<'} Your Cart`}</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <ShoppingBagOutlinedIcon fontSize='large' />
            <h3> Your Shopping bag is empty.</h3>
            <Link href='/'>
              <button
              type='button'
              onClick={() => setShowCart(false)}
              className='btn'
              >
                Back to Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])}
                className='cart-product-image'
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>
                    {item.name}
                  </h5>
                  <h4>
                    {item.price}€
                  </h4>
                </div>
                <div className='flex bttom'>
                  <div>
                      <p className='quantity-desc'>
                          <span className='minus' 
                          onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                          >
                              <RemoveIcon/>
                          </span>
                          <span className='num'>
                              {item.quantity}
                          </span>
                          <span className='plus' 
                          onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                          >
                              <AddIcon/>
                          </span>
                      </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <HighlightOffIcon/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && 
          <div className='cart-bottom'>
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice.toFixed(2)}€</h3>
            </div>
            <div className="btn-container">
              <button className="btn" type='button'>
                Pay with Stripe
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Cart;