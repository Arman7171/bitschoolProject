import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './style.module.css';
import { connect } from 'react-redux';
import { changeInfo, changePass } from '../../../Store/auth/userActions'

const UserInfo = ({ user, changeInfo, changePass, passChanged }) => {

    const [data, setData] = useState({
        name: '',
        surname: ''
    });
    const [passData, setPassData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [info, setInfo] = useState('name');
    const nameRef = useRef();

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus()
        }
        if (user?.name) {
            setData({
                name: user.name,
                surname: user.surname
            })
        }

    }, [user]);

    useEffect(() => {
        if(passChanged){
            setPassData({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            })
        }
    },[passChanged])

    const [errors, setErrors] = useState('');

    const changeData = (name, e) => {
        setData({
            ...data,
            [name]: e.target.value
        });
        setErrors('');
    };

    const changePassData = (name, e) => {
        setPassData({
            ...passData,
            [name]: e.target.value
        });
        setErrors('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.name.trim() || !data.surname.trim()) {
            setErrors('fill in all fields');
        }
        else {
            changeInfo(data)
        }
    };

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if(!passData.oldPassword.trim() || !passData.newPassword.trim() || !passData.confirmNewPassword.trim()){
            setErrors('fill in all fields');
        }
        else if(passData.newPassword.trim().length < 8){
            setErrors("min 8 simvol");
        }
        else if(passData.newPassword !== passData.confirmNewPassword){
            setErrors("Passwords didn't match");
        }
        else{
            changePass(passData);
        }
    }

    return (
        <div className={classes.loginContainer}>
            <h1 className='mb-3'>Change Information</h1>
            <h6 className={`text-primary mb-3 ${classes.infoProperty}`}>
                <span
                    className={info === 'name' ? classes.active : ''}
                    onClick={() => setInfo('name')}
                >Name </span>
            /
            <span
                    className={info === 'password' ? classes.active : ''}
                    onClick={() => setInfo('password')}
                > Password</span>
            </h6>
            {
                info === 'name' ?
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
                    :
                    <Form className='text-right w-35' onSubmit={(e) => handlePassSubmit(e)}>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Old Password"
                                value={passData.oldPassword}
                                onChange={(e) => changePassData('oldPassword', e)}
                                required
                                ref={nameRef}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={passData.newPassword}
                                onChange={(e) => changePassData('newPassword', e)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Confirm New Password"
                                value={passData.confirmNewPassword}
                                onChange={(e) => changePassData('confirmNewPassword', e)}
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
            }

        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        passChanged: state.userReducer.passChanged
    }
};

const mapDispatchToProps = {
    changeInfo,
    changePass
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);