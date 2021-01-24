import request from '../../helpers/requests';
import * as actionTypes from './userActionType';
import { saveJWT, removeJWT, getJWT } from '../../helpers/userAuth';
import { history } from '../../helpers/history';

export const register = (data) => {
    console.log('REGISTER_USER_SUCCESS', data);
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user`, 'post', data, true)
        .then(res => {
            dispatch(
                {
                    type: actionTypes.REGISTER_USER_SUCCESS, 
                    message: res.data, 
                }
            );
            history.push('/login');
        })
        .catch(err => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.response.data.error.message})
        })
    }
};

export const login = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })

        request(`/user/sign-in`, 'post', data, true)
        .then(res => {
            console.log('login', res);
            saveJWT(res.data);
            dispatch(
                {
                    type: actionTypes.LOGIN_USER_SUCCESS, 
                    message: res.data, 
                }
            );
            history.push('/');
        })
        .catch(err => {
            console.log('login err', err.response);
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.response.data.message})
        })
    }
};

export const logout = () => {
    return async (dispatch) => {
        console.log('-------', getJWT());
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user/sign-out`, 'post', {jwt: await getJWT()}, true)
        .then(res => {
            removeJWT();
            dispatch(
                {
                    type: actionTypes.LOGOUT_SUCCESS, 
                    message: res.data, 
                }
            );
            history.push('/login');
        })
        .catch(err => {
            console.log('login err', err.response);
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};

export const getInfo = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user`)
        .then(res => {
            console.log('userinfo------', res.data);
            dispatch(
                {
                    type: actionTypes.GET_USERINFO_SUCCESS, 
                    user: res.data
                }
            );
        })
        .catch(err => {
            console.log('login err', err.response);
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};