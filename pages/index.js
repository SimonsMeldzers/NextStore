import React from 'react'

const index = () => {
  return (
    <>
    HeroBanner
    <div>
      <h2>Best Selling Products</h2>
      <p>Unique phone case for everyone!</p>
    </div>
    <div>
      {['Product 1', 'Product 2'].map(
        (product) => product + ' ')}
    </div>
    Footer
    </>
  )
}

export default index;