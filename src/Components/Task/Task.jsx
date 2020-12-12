import React, { PureComponent } from 'react';
import classes from './task.module.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, shortStr } from '../../helpers/utils';

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
                        <input
                            type="checkbox"
                            onClick={this.toggleCheckbox}
                            />
                        <div className='mx-3'>
                            <h5 className={`${classes.title}`}><Link to={`/task/${data._id}`}>{data.title}</Link></h5>
                            <span className={`${classes.taskDescription}`}> {data.description ? shortStr(data.description, 80) : 'None'} </span>
                            <p>{data.date ? formatDate(data.date) : 'None'}</p>
                            <p>created: {data.created_at ? formatDate(data.created_at) : 'None'}</p>
                            <p className={`${data.status === 'active' ? 'text-success' : 'text-danger'}`}>status: {data.status} </p>
                        </div>
                    <div className={classes.remove}>
                        <Button
                        onClick={() => this.props.onRemove(data._id)}
                        variant="danger"
                        disabled={this.props.disabled}
                        >
                        <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                        onClick={() => this.props.onEdit()}
                        className='ml-2'
                        variant="info"
                        disabled={this.props.disabled}
                        >
                        <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </div>
                </div>
        );
    }
    }

    Task.propTypes = {
        onEdit: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired
    };

export default Task;