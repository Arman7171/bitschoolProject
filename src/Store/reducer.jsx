import * as actionTypes from './actionType';


export const defaultState = {
    tasks: [],
    loading: false,
    error: null,
    addTaskSuccess: false,
    removeTasksSuccess: false,
    successMessage: null,
    task: null
};


export const mainReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.LOADING: {
            return {
                ...state,
                successMessage: null,
                error: null,
                loading: true
            }
        };
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        };

        case actionTypes.GET_TASKS_SUCCESS: {
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            }
        };

        case actionTypes.GET_TASK_SUCCESS: {
            return {
                ...state,
                task: action.task,
                loading: false
            }
        };

        case actionTypes.EDIT_TASK_SUCCESS: {
            if(action.single){
                return {
                    ...state,
                    task: action.task,
                    loading: false,
                    successMessage: 'task edit success'
                }
            }
            const tasks = [...state.tasks];
            const index = tasks.findIndex((task) => task._id === action.task._id);
            tasks[index] = action.task;
            return {
                ...state,
                tasks: tasks,
                loading: false,
                successMessage: 'task edit success'
            }
        };

        case actionTypes.ADDING_TASK: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                successMessage: null,
                error: null
            }
        };
        case actionTypes.ADD_TASK_SUCCESS: {
            return {
                ...state,
                tasks: [action.task, ...state.tasks],
                loading: false,
                addTaskSuccess: true,
                successMessage: 'task creates success'
            }
        };

        case actionTypes.DELETE_TASK_SUCCESS: {
            if(action.single){
                return {
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: 'task remove success'
                }
            }
            else{
                const tasks = state.tasks.filter((task) => task._id !== action.id);
                return {
                    ...state,
                    tasks,
                    loading: false,
                    successMessage: 'task remove success'
                }
            }
        };


        case actionTypes.REMOMVEING_TASKS: {
            return {
                ...state,
                loading: true,
                successMessage: null,
                removeTasksSuccess: false
            }
        }
        case actionTypes.DELETE_TASKS_SUCCESS: {
            let tasks = [...state.tasks];
            action.taskIds.forEach(taskId => {
                tasks = tasks.filter((task) => task._id !== taskId);
            });
            return {
                ...state,
                tasks,
                loading: false,
                successMessage: 'tasks remove success',
                removeTasksSuccess: true
            }
        };

        default: return state;
    }
};