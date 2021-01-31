import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getInfo } from '../../Store/auth/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import classes from './style.module.css';

const Header = ({ isAuthenticated, logout, getInfo, user }) => {
    const [dropdown, setDropdown] = useState(false);
    
    useEffect(() => {
        if (isAuthenticated) {
            getInfo();
        }
    }, [isAuthenticated, getInfo])
    return (
        <Navbar expand="sm" className={`${classes.navbar} py-1`}>
            <Navbar.Brand className='py-0'>
                        <NavLink
                            to='/'
                            exact
                            className={`${classes.brand}`}
                        >
                            ToDo
                        </NavLink>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to='/about' className={`activeLink  ${classes.link}`}>About us</NavLink>
                    <NavLink to='/contact' className={`activeLink  ${classes.link}`}>Contact</NavLink>
                    {
                        !isAuthenticated ?
                            <>
                                <NavLink to='/login'className={`activeLink  ${classes.link}`}>Login</NavLink>
                                <NavLink to='/register' className={`activeLink  ${classes.link}`}>Registration</NavLink>
                            </>
                            :
                            null
                    }
                </Nav>
                {
                    isAuthenticated ?
                        <>
                            <FontAwesomeIcon 
                                icon={faUserCircle} 
                                className={classes.user} 
                                onClick={() => setDropdown(!dropdown)}
                            />
                            <div className={`${classes.dropdownMenu} flex-column`} style={{top: dropdown ? '68px' : '-78px', display: dropdown ? 'flex' : 'none'}}>
                                <span className='text-dark'>{user?.name} {user?.surname}</span> 
                                <Link to='/userInfo' onClick={() => setDropdown(false)}>Settings</Link>
                                <span className={`${classes.logout}`} onClick={() => {logout(); setDropdown(false)}}>Logout</span>
                            </div>
                           
                        </>
                        : null
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.userReducer.isAuthenticated,
        user: state.userReducer.user
    }
};

const mapDispatchToProps = {
    logout,
    getInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);