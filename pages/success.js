import React, { useState, useEffect } from 'react'

import Link from 'next/link';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import { useStateContext } from '@/context/StateContext';
import { runConfetti } from '@/lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
    
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runConfetti();
    }, []);

    return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
            <ThumbUpOffAltIcon fontSize='large'/>
            </p>
            <h2> You order has been placed! </h2>
            <p className='email-msg'> Chec your email inbox for receipt.</p>
            <p className="description">
                If you have any questions, please email
                <a className='email' href="mailto:order@example.com">order@example.com</a>
            </p>
            <Link href='/'>
                <button type='button' width="300px" className='btn'> Continue shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default Success;