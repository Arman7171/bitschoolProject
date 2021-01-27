import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './style.module.css';
import { connect } from 'react-redux';
import { register } from "../../../Store/auth/userActions";
import { Link } from 'react-router-dom';

const Register = props => {

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: ''
    });
    
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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
        else if(data.password.trim().length < 8){
            setErrors({
                ...errors,
                password: "min 8 simvol"
            });
        }
        else if(data.password !== data.confirmPassword){
            setErrors({
                ...errors,
                confirmPassword: "Passwords didn't match"
            });
        }
        else{
            props.register(data);
        }
    }

    return (
        <div className={classes.registerContainer}>
            <h1 className={`text-primary mb-3 ${classes.logo}`}>ToDo</h1>
        <Form className='text-right w-35' onSubmit={(e) => handleSubmit(e)}>
        <h4 className='float-left mb-3'>Registration</h4>
        <Form.Group>
            <Form.Control 
                type="text" 
                placeholder="name" 
                value={data.name}
                onChange={(e) => changeData('name', e)}
                required
            />
        </Form.Group>
            <Form.Group>
            <Form.Control 
                type="text" 
                placeholder="surname" 
                value={data.surname}
                onChange={(e) => changeData('surname', e)}
                required
            />
        </Form.Group>
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
            <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={(e) => changeData('confirmPassword', e)}
                    required
                />
                <Form.Text className="text-danger">
                    {errors.confirmPassword}
                </Form.Text>
            </Form.Group>

            <Button style={{background: '#59ACF9'}} type="submit">
                Submit
            </Button>
        </Form>
        <Link to='/login' className='mt-3'>Alredy registered? Try to Login.</Link>
        </div>
    );
}

const mapDispatchToProps = {
    register
};

export default connect(null, mapDispatchToProps)(Register);