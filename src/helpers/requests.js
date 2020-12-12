import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

const request = (url, method='get', body) => {
    return axios[method](apiURL + url, body && body)
}

export default request;