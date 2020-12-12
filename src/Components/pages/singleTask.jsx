import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditModal from '../EditTask/EditModal';
import { connect } from 'react-redux';
import { editTask, getTask, removeTask } from '../../Store/actions';
import { formatDate } from '../../helpers/utils';

class SingleTask extends PureComponent {
    state = {
        task: null,
        isEdit: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getTask(id);
    };

    componentDidUpdate(prevProps){
        if(prevProps.task && this.props.task === null){
          this.props.history.push('/');
        }
        else if(prevProps.task && prevProps.task !== this.props.task){
          this.setState({
            isEdit: false
          });
        }
    };

    toggleEdit = () => {
        this.setState({ 
            isEdit: !this.state.isEdit
        });
    };

    editTask = (newTask) => {
        this.props.editTask(newTask, true);
    };

    removeTask = (id) => {
        this.props.removeTask(id, true); 
    };
    

    render() {
        let { task } = this.props;
        let { isEdit } = this.state;
        return (
            <>
                {
                    task ? 
                        <div className='text-left mt-5 ml-5'>
                            <h2>Title: {task.title}</h2>
                            <p className='w-75 mb-4 '>Description: {task.description}</p>
                            <h6>Date: {formatDate(task.date)}</h6>
                            <h6>Created: {formatDate(task.created_at)} </h6>
                            <h6 className={`${task.status === 'active' ? 'text-success' : 'text-danger'}`}>status: {task.status} </h6>
                            <Button
                            className='mt-4'
                            variant="danger"
                            onClick={() => this.removeTask(task._id)}
                            >
                            <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button
                            className='ml-2 mt-4'
                            variant="info"
                            onClick={this.toggleEdit}
                            >
                            <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </div>
                    : <h5>There is not task</h5>
                }
                {
                    isEdit ? 
                        <EditModal
                            task = {task}
                            onCancel={this.toggleEdit}
                            onSubmit={this.editTask}
                        />
                        : null
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        task: state.task
    };
};

const mapDisaptchToProps = {
    getTask: getTask,
    removeTask: removeTask,
    editTask: editTask
};

export default connect(mapStateToProps, mapDisaptchToProps)(SingleTask);