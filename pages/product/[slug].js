import React from 'react';

import { client, urlFor } from '../../lib/client';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    // If rating has more than .5, then apply a half star
    const rating = 4.5;
    let halfStar = 0;
    if(Math.floor(rating) + 0.5 <= rating){
        halfStar += 1;
    }

  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[0])} />
                </div>
                {/* <div className="small-images-container">
                    {image?.map((item, i) => (
                        <img
                            src={urlFor(item)}
                        />
                    ))}
                </div> */}
            </div>
            <div className='product-details-desc'>
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