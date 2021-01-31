import React from 'react';
import { Link } from 'react-router-dom';
import classes from './style.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return(
        <div className={`bg-dark d-flex justify-content-between text-white py-3 mt-3 px-2 align-items-center ${classes.footer}`}>
            <div className='d-flex align-items-center'>
                <h3 className={`${classes.logo}`}>ToDo</h3>
                <Link to='/about' className='mx-4'>About us</Link>
                <Link to='/contact' className='mx-md-2'>Contact</Link>
            </div>
            <div>
                <a href="https://github.com/Arman7171" rel="noopener noreferrer" target="_blank"><FaGithub /></a>
                <a 
                    href="https://www.linkedin.com/in/arman-vardanyan-56b321182/" 
                    rel="noopener noreferrer" 
                    target="_blank" 
                    className='ml-3'
                >
                    <FaLinkedin />  
                </a>
            </div>
        </div>
    )
};

export default Footer;