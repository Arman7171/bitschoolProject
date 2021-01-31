import request from '../../helpers/requests';
import * as actionTypes from './userActionType';
import { saveJWT, removeJWT, getJWT } from '../../helpers/userAuth';
import { history } from '../../helpers/history';

export const register = (data) => {
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
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.response.data.error.message})
        })
    }
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user/sign-out`, 'post', {jwt: (await getJWT()).jwt}, true)
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
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};

export const getInfo = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user`)
        .then(res => {
            dispatch(
                {
                    type: actionTypes.GET_USERINFO_SUCCESS, 
                    user: res.data
                }
            );
        })
        .catch(err => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};

export const changeInfo = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user`, 'put', data)
        .then(res => {
            dispatch(
                {
                    type: actionTypes.CHANGE_USERINFO_SUCCESS, 
                    data: {name: res.data.name, surname: res.data.surname}
                }
            );
        })
        .catch(err => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};

export const sendContactForm = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/form`, 'post', data)
        .then(res => {
            dispatch(
                {
                    type: actionTypes.SENDFORM_SUCCESS, 
                }
            );
        })
        .catch(err => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message})
        })
    }
};

export const changePass = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING })
        request(`/user/password`, 'put', data)
        .then(res => {
            dispatch(
                {
                    type: actionTypes.CHANGE_PASSWORD_SUCCESS, 
                    data
                }
            );
        })
        .catch(err => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.response.data.error.message})
        })
    }
};