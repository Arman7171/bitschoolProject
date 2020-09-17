import React, { PureComponent } from 'react';
import classes from './task.module.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


class Task extends PureComponent {
    state = {
        checked: false
    };

    toggleCheckbox = ()=>{
        this.setState({
            checked: !this.state.checked
        })
        this.props.onCheck()
    };
    render(){
        const { data } = this.props;
        const { checked } = this.state
        return(
                <div className={`${classes.task} ${checked ? classes.checked : ''}`}>
                    <div className={classes.taskText}>
                        <input
                            type="checkbox"
                            onClick={this.toggleCheckbox}
                            />
                        <span className="pl-3"> {data.text} </span>
                    </div>
                    <div className={classes.remove}>
                        <Button
                        onClick={() => this.props.onRemove(data.id)}
                        variant="danger"
                        >
                        <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </div>
        );
    }
    }


export default Task;