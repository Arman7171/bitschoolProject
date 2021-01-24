import * as actionTypes from './userActionType';
import { loginStatus } from "../../helpers/userAuth";

export const defaultState = {
    loading: false,
    error: null,
    successMessage: null,
    user: {},
    isAuthenticated: loginStatus()
};


export const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                successMessage: null,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case actionTypes.REGISTER_USER_SUCCESS: 
            return{
                ...state,
                loading: false,
                successMessage: 'You have successfully registered'
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
            }
        case actionTypes.LOGOUT_SUCCESS:
            return{
                ...state,
                loading: false,
                user: {},
                isAuthenticated: false,
            }
        case actionTypes.GET_USERINFO_SUCCESS:{
            return{
                ...state,
                loading: false,
                user: action.user
            }
        }


        default: return state;
    }
};