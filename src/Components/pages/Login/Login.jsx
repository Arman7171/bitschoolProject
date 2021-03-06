import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './style.module.css';
import { connect } from 'react-redux';
import { login } from "../../../Store/auth/userActions";
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const changeData = (name, e) => {
        setData({
            ...data,
            [name]: e.target.value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!data.email){
            setErrors({
                ...errors,
                email: "email is requaired"
            });
        }
        else if(!data.password){
            setErrors({
                ...errors,
                password: "password is requaired"
            });
        }
        else{
            props.login(data);
        }
    }

    return (
        <div className={classes.loginContainer}>
        <h1 className={`text-primary mb-5 ${classes.logo}`}>ToDo</h1>
        <Form className='text-right w-35' onSubmit={(e) => handleSubmit(e)}>
        <h4 className='float-left mb-3'>Login</h4>
            <Form.Group>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={data.email}
                    onChange={(e) => changeData('email', e)}
                    required
                />
                <Form.Text className="text-danger">
                    {errors.email}
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={data.password}
                    onChange={(e) => changeData('password', e)}
                    required
                />
                <Form.Text className="text-danger">
                    {errors.password}
                </Form.Text>
            </Form.Group>
            <Button style={{background: '#59ACF9'}} type="submit">
                Submit
            </Button>
        </Form>
        <Link to='/register' className='mt-4'>Don't have an account? Register now</Link>
        </div>
    );
}

const mapDispatchToProps = {
    login
};

export default connect(null, mapDispatchToProps)(Login);