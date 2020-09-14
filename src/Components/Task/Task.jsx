import React from 'react';
import classes from './task.module.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Task = (props) => {
    const removeTask = (id) => {
        props.onRemove(id)
    }
    return(
            <div className={classes.task}>
                <div className={classes.taskText}>
                    <input type="checkbox" name="" id="" />
                    <span className="pl-3"> {props.data.text} </span>
                </div>
                <div className={classes.remove}>
                    <Button
                    onClick={() => removeTask(props.data.id)}
                    variant="danger"
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>
    );
}

export default Task;