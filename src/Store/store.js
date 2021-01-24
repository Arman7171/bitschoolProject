import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { taskReducer } from './task/taskReducer';
import { userReducer } from './auth/userReducer';


const middlewaresArr = [thunk];
if(process.env.NODE_ENV === "development"){
    middlewaresArr.push(logger);
}

const mainReducer = combineReducers({
    taskReducer,
    userReducer
});

const middlewares = applyMiddleware(...middlewaresArr);



export const store = createStore(mainReducer, middlewares);

