import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './Login/style.module.css';
import { connect } from 'react-redux';
import { sendContactForm } from '../../Store/auth/userActions'

const Contact = ({ user, sendContactForm }) => {

    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const nameRef = useRef();

    useEffect(() => {
        if(nameRef.current){
            nameRef.current.focus();
        }
        if (user?.name) {
            setData({
                name: user.name,
                surname: user.surname
            })
        }

    }, [user])

    const [errors, setErrors] = useState('');

    const changeData = (name, e) => {
        setData({
            ...data,
            [name]: e.target.value
        });
        setErrors('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
            setErrors('fill in all fields');
        }
        else {
            sendContactForm(data);
            setData({
                name: '',
                email: '',
                message: ''
            })
        }
    }

    return (
        <div className={classes.loginContainer}>
            <h1 className='text-primary mb-3'>Contact Us</h1>
            <Form className='text-right w-35' onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => changeData('name', e)}
                        required
                        ref={nameRef}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => changeData('email', e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        className='my-3'
                        placeholder='Message'
                        value={data.message}
                        onChange={(e) => changeData('message', e)}
                        required
                    />
                    <Form.Text className="text-danger">
                        <h6>{errors}</h6>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
            </Button>
            </Form>
        </div>
    );
}

const mapDispatchToProps = {
    sendContactForm
};

export default connect(null, mapDispatchToProps)(Contact);