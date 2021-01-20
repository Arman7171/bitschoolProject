import React, { useEffect } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, getInfo } from '../Store/auth/userActions';

const Header = ({isAuthenticated, logout, getInfo, user}) => {
useEffect(() =>{
    if(isAuthenticated){
        getInfo();
    }
}, [isAuthenticated, getInfo])
    return (
        <Navbar bg="dark" expand="sm">
            <Navbar.Brand>
                {
                    isAuthenticated ? 
                    <NavLink 
                    to='/'
                    className='activeLink'
                    exact 
                >
                    Home
                </NavLink>
                : null
                }
             
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/contact' className='mx-md-2 activeLink'>Contact</NavLink>
                    {
                        !isAuthenticated ?
                        <>
                            <NavLink to='/login' className='mx-2 activeLink'>Login</NavLink>
                            <NavLink to='/register' className='mx-2 activeLink'>Registration</NavLink>
                        </>
                        :
                        null
                    }
                </Nav>
                {
                    isAuthenticated ?
                        <> 
                            <h6 className='text-white mr-4'> {user?.name} {user?.surname} </h6>
                            <Button 
                                to='/login' 
                                variant='danger' 
                                className='text-right activeLink'
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </>
                         : null 
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.userReducer.isAuthenticated,
        user: state.userReducer.user
    }
};

const mapDispatchToProps = {
    logout,
    getInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);