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
            console.log(data);
            props.login(data);
        }
    }

    return (
        <div className={classes.loginContainer}>
            <h1 className='text-primary mb-3'>ToDo App Login</h1>
        <Form className='text-right w-35' onSubmit={(e) => handleSubmit(e)}>
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
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <Link to='/register'>Don't have an account? Register now</Link>
        </div>
    );
}

const mapDispatchToProps = {
    login
};

export default connect(null, mapDispatchToProps)(Login);