import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';

function Footer() {
  return (
    <div className="footer-container">
      <p> Copyright © 2023 Next Store. All rights reserved.</p>
      <p className='icons'>
        <InstagramIcon/>
        <ShareIcon/>
      </p>
    </div>
  )
}

export default Footer;