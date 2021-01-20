import { store } from '../Store/store';
import { LOGOUT_SUCCESS } from '../Store/auth/userActionType';
import { history } from './history';
import decode from 'jwt-decode';
import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const saveJWT = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
}

export function loginStatus(){
    return localStorage.getItem('token');
}

export const getJWT = () => {
    const token = localStorage.getItem('token');

    if(!token){
        store.dispatch({type: LOGOUT_SUCCESS});
        history.push('/login');
        return null;
    }

    const jwtParsed = JSON.parse(token);
    const decoded = decode(jwtParsed.jwt);
    var newJWT;
    console.log(decoded);
    if(decoded.exp - Date.now()/1000 < 110){
        axios.put(apiURL + `/user/${decoded.userId}/token`, {refreshToken: jwtParsed.refreshToken})
        .then((res) => {
            console.log('refresh', res);
            saveJWT(res.data.jwt)
            newJWT = res.data.jwt;
        })
        .catch((err) => {
            console.log('refresh', err);
        })
        return Promise.resolve(newJWT);
    }

    return Promise.resolve(jwtParsed.jwt);
}

export const removeJWT = () => {
    localStorage.removeItem('token');
}