import React from 'react'

const Task = (props) => {
    return (
        <div>
            <h2>{props.index}. <span>{props.task}</span></h2>
        </div>
    );
}

export default Task;