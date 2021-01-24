import * as actionTypes from './taskActionType';
import {LOGOUT_SUCCESS, AUTH_LOADING} from '../auth/userActionType';

export const defaultState = {
    tasks: [],
    loading: false,
    error: null,
    addTaskSuccess: false,
    removeTasksSuccess: false,
    successMessage: null,
    task: null
};


export const taskReducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.LOADING:
            return {
                ...state,
                successMessage: null,
                error: null,
                loading: true
            };
        case actionTypes.ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false
            };

        case actionTypes.GET_TASK_SUCCESS: 
            return {
                ...state,
                task: action.task,
                loading: false
            };

        case actionTypes.EDIT_TASK_SUCCESS: {
            if(action.single){
                return {
                    ...state,
                    task: action.task,
                    loading: false,
                    successMessage: 'task edit successfully'
                }
            }
            const tasks = [...state.tasks];
            const index = tasks.findIndex((task) => task._id === action.task._id);
            tasks[index] = action.task;
            return {
                ...state,
                tasks: tasks,
                loading: false,
                successMessage: 'task edit successfully'
            }
        };

        case actionTypes.ADDING_TASK: 
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                successMessage: null,
                error: null
            };
        case actionTypes.ADD_TASK_SUCCESS: 
            return {
                ...state,
                tasks: [action.task, ...state.tasks],
                loading: false,
                addTaskSuccess: true,
                successMessage: 'task creates successfully'
            };

        case actionTypes.DELETE_TASK_SUCCESS: 
            if(action.single){
                return {
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: 'task remove successfully'
                }
            }
            else{
                const tasks = state.tasks.filter((task) => task._id !== action.id);
                return {
                    ...state,
                    tasks,
                    loading: false,
                    successMessage: 'task remove successfully'
                }
            };


        case actionTypes.REMOMVEING_TASKS: 
            return {
                ...state,
                loading: true,
                successMessage: null,
                removeTasksSuccess: false
            };
        case actionTypes.DELETE_TASKS_SUCCESS: {
            let tasks = [...state.tasks];
            action.taskIds.forEach(taskId => {
                tasks = tasks.filter((task) => task._id !== taskId);
            });
            return {
                ...state,
                tasks,
                loading: false,
                successMessage: 'tasks remove successfully',
                removeTasksSuccess: true
            }
        };

        case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
            let message;
      
            if(action.status === 'done'){
              message = 'Congtatulations, you have completed the task!';
            }
            else{
              message = 'The task is active now!'
            }
      
            const newState = {
              ...state,
              loading: false,
              successMessage: message,
            }
      
            if(action.from === 'single'){
              return {
               ...newState,
                task: action.editedTask
              };
            }
            else {
              const tasks = [...state.tasks];
              const foundIndex = tasks.findIndex(task => task._id === action.editedTask._id);
              tasks[foundIndex] = action.editedTask;
        
              return {
                ...newState,
                tasks: tasks
              };
            }
            
        }
        case LOGOUT_SUCCESS:{
            return defaultState
        }
        case AUTH_LOADING:{
            return {
                ...state,
                successMessage: null,
                error: null
            }
        }

        default: return state;
    }
};