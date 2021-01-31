import axios from 'axios';
import { getJWT } from './userAuth';

const apiURL = process.env.REACT_APP_API_URL;

const request = async(url, method='get', body, loginrequest=false) => {
    var jwtData;
    var config;
    if(!loginrequest){
        jwtData = await getJWT();
        if(!jwtData?.jwt){
            return Promise.reject({message: 'Something went wrong!'})
        }
        else{
            config = {
                headers: {
                    'Authorization': `Bearer ${jwtData?.jwt}`
                }
            }
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