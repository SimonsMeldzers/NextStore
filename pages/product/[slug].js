import React, { useState } from 'react';

import { client, urlFor } from '../../lib/client';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Product from '../../components/Product';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;

    const reviewCount = 69

    // If rating has more than .5, then apply a half star
    const rating = 0.5;
    let halfStar = 0;
    if(Math.floor(rating) + 0.5 <= rating){
        halfStar += 1;
    }

    const [index, setIndex] = useState(0);
  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={urlFor(image && image[index])} />
                </div>
                <div className="small-images-container">
                    {image?.map((item, i) => (
                        <img
                            src={urlFor(item)}
                            onMouseEnter={() => setIndex(i)}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                        />
                    ))}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                    {/* Logic for rating system */}
                    {Array.from({ length: rating }).map((_, index) => (
                        <StarIcon key={index} />
                    ))}
                        {halfStar == 1 
                        ? 
                        <>
                        <StarHalfIcon/> 
                        {Array.from({ length: 4 - Math.floor(rating) }).map((_, index) => (
                            <StarBorderIcon key={index} />
                        ))}
                        </>
                        : 
                        Array.from({ length: 5 - Math.floor(rating) }).map((_, index) => (
                        <StarBorderIcon key={index} />
                    ))}
                    
                    </div>
                    <p style={{marginTop:'-6px'}}>({reviewCount})</p>
                </div>
                <h4> Details:</h4>
                <p>{details}</p>
                <p className='price'>{price}€</p>
                <div className="quantity">
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus'>
                            <RemoveIcon/>
                        </span>
                        <span className='num'>
                            0
                        </span>
                        <span className='plus'>
                            <AddIcon/>
                        </span>
                    </p>
                </div>
                <div className='buttons'>
                    <button className='add-to-cart' type='button'>
                            Add to Cart
                    </button>
                    <button className='buy-now' type='button'>
                            Buy Now
                    </button>
                </div>
            </div>
        </div>
        <div className="maylike-products-wraper">
            <h2> You may also like </h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id}
                        product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
};

// Need getStaticPaths before making getStaticProps
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

  
    return {
      props: { products, product}
    }
}

export default ProductDetails;