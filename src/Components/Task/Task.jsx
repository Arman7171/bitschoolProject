import React, { PureComponent } from 'react';
import classes from './task.module.css';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
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
                            ${data.status === 'active' ? classes.activeTask : ''
                    }`}>
                <input
                    type="checkbox"
                    onClick={this.toggleCheckbox}
                />
                <div className='mx-3 text-center'>
                    <h5 className={`${classes.title}`}><Link to={`/task/${data._id}`}>{data.title}</Link></h5>
                    <span className={`${classes.taskDescription}`}> {data.description ? shortStr(data.description, 80) : 'None'} </span>
                    <p>{data.date ? formatDate(data.date) : 'None'}</p>
                    <p>created: {data.created_at ? formatDate(data.created_at) : 'None'}</p>
                    <p className={`${data.status === 'active' ? 'text-success' : 'text-danger'}`}>status: {data.status} </p>
                </div>
                <div className={classes.remove}>
                    {
                        data.status === 'active' ?
                            <Button
                                onClick={() => this.props.changeTaskStatus(data._id, { status: 'done' })}
                                className='mr-2'
                                variant="success"
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </Button> :
                            <Button
                                onClick={() => this.props.changeTaskStatus(data._id, { status: 'active' })}
                                className='mr-2'
                                variant="warning"
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faHistory} />
                            </Button>
                    }
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


const mapDispatchToProps = {
    changeTaskStatus
};

export default connect(null, mapDispatchToProps)(Task);