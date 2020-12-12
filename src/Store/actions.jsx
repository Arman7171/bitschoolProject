import request from '../helpers/requests';
import * as actionTypes from './actionType';

export const getTasks = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request('/task')
        .then(res => {
            dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const getTask = (id) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/task/${id}`)
        .then(res => {
            dispatch({ type: actionTypes.GET_TASK_SUCCESS, task: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const editTask = (changedTask, single) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/task/${changedTask._id}`, 'put', changedTask)
        .then(res => {
            dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, task: res.data, single})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const addTask = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADDING_TASK })

        request(`/task`, 'post', data)
        .then(res => {
            dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task: res.data})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const removeTask = (id, single) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.LOADING })

        request(`/task/${id}`, 'delete',)
        .then(res => {
            dispatch({ type: actionTypes.DELETE_TASK_SUCCESS, id, single})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};

export const removeTasks = (data) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.REMOMVEING_TASKS })

        request(`/task`, 'patch', data)
        .then(res => {
            dispatch({ type: actionTypes.DELETE_TASKS_SUCCESS, taskIds: data.tasks})
        })
        .catch(err => {
            dispatch({ type: actionTypes.ERROR, error: err.message})
        })
    }
};