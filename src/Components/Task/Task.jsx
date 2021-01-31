import React, { PureComponent } from 'react';
import classes from './task.module.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory, faClock } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { changeTaskStatus } from '../../Store/task/taskActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, shortStr } from '../../helpers/utils';

class Task extends PureComponent {
    state = {
        checked: false
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.props.onCheck()
    };
    render() {
        const { data } = this.props;
        const { checked } = this.state
        return (
            <div className=
                {`
                            ${classes.task} 
                            ${checked ? classes.checked : ''} 
                            ${data.status === 'done' ? classes.done : ''
                    }`}>
                <div className='d-sm-flex align-items-center'>
                <input
                    type="checkbox"
                    onClick={this.toggleCheckbox}
                    className={`${classes.checkbox} mr-2`}
                />
                <div>
                    <h5 className={`${classes.title}`}><Link to={`/task/${data._id}`} className={data.status === 'active' ? classes.active : classes.done}>{data.title}</Link></h5>
                    <span className={`${classes.taskDescription}`}> {data.description ? shortStr(data.description, 30) : 'None'} </span>
                    <p>created: {data.created_at ? formatDate(data.created_at) : 'None'}</p>
                    <p className={`${data.status === 'active' ? 'text-success' : 'text-warning'}`}>status: {data.status} </p>
                    </div>
                </div>
                <div className={classes.taskDate}>
                    {
                        data.status === 'active' ?
                            <Button
                                onClick={() => this.props.changeTaskStatus(data._id, { status: 'done' })}
                                className='px-1 py-0'
                                variant="light"
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faHistory} />
                            </Button> :
                            <Button
                                onClick={() => this.props.changeTaskStatus(data._id, { status: 'active' })}
                                className='px-1 py-0'
                                variant="light"
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                    }
                    <span className='px-3'> {formatDate(data.date)} </span>
                    <FontAwesomeIcon icon={faClock} />
                </div>

                    <Button
                        onClick={() => this.props.onRemove(data._id)}
                        variant="muted"
                        className={`${classes.removeTask} p-0 m-2 text-removecolor`}
                        disabled={this.props.disabled}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        onClick={() => this.props.onEdit()}
                        className={`${classes.edit} p-0 m-2`}
                        variant="muted"
                        disabled={this.props.disabled}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
            </div>
        );
    }
}

Task.propTypes = {
    onEdit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
};


const mapDispatchToProps = {
    changeTaskStatus
};

export default connect(null, mapDispatchToProps)(Task);