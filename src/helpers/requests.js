import axios from 'axios';
import { getJWT } from './userAuth';

const apiURL = process.env.REACT_APP_API_URL;

const request = async(url, method='get', body, loginrequest=false) => {
    var jwtData;
    if(!loginrequest){
        jwtData = await getJWT();
    }
    if(!loginrequest && !jwtData?.jwt){
        return Promise.reject({message: 'Something went wrong!'})
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${jwtData?.jwt}`
        }
    }
    if(body){
        return axios[method](apiURL + url, body, loginrequest ? '' : config)
    }
    else{
        return axios[method](apiURL + url, config)
    }
    
}

export default request;