import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './Login/style.module.css';
import { connect } from 'react-redux';
import { changeInfo } from '../../Store/auth/userActions'

const UserInfo = ({user, changeInfo}) => {

    const [data, setData] = useState({
        name: '',
        surname:  ''
    });
    const nameRef = useRef();

    useEffect(() => {
        if(nameRef.current){
            nameRef.current.focus()
        }
        if(user?.name){
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
        if(!data.name.trim() || !data.surname.trim()){
            setErrors('fill in all fields');
        }
        else{
            console.log(data);
            changeInfo(data)
        }
    }

    return (
        <div className={classes.loginContainer}>
        <h1 className='text-primary mb-3'>Change Information</h1>
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
                    placeholder="Surnam" 
                    value={data.surname}
                    onChange={(e) => changeData('surname', e)}
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

const mapStateToProps = state => {
    return{
        user: state.userReducer.user
    }
};

const mapDispatchToProps = {
    changeInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);