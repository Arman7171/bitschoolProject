import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <div className='bg-dark d-flex justify-content-between py-3 px-2 align-items-center'>
            <div className='d-sm-flex'>
                <Link to='/'><h5 className='text-primary'>ToDo</h5></Link>
                <Link to='/about' className='mx-2'>About us</Link>
                <Link to='/contact' className='mx-md-2 activeLink'>Contact</Link>
            </div>
            <div>
                <a href="https://github.com/Arman7171" rel="noopener noreferrer" target="_blank"> GitHub </a>
                <a href="https://www.linkedin.com/in/arman-vardanyan-56b321182/" rel="noopener noreferrer" target="_blank"> LinkedIn </a>
            </div>
        </div>
    )
};

export default Footer;