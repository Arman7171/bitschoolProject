import React, { PureComponent } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner/Spinner';
import EditModal from '../EditTask/EditModal';

export default class SingleTask extends PureComponent {
    state = {
        task: null,
        isEdit: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:3001/task/${id}`)
            .then(res => {
                this.setState({
                    task: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    toggleEdit = () => {
        this.setState({ 
            isEdit: !this.state.isEdit
        });
    };

    editTask = (newTask) => {
        axios.put(`http://localhost:3001/task/${newTask._id}`, newTask)
        .then(res => {
          this.setState({
            task: newTask,
            isEdit: false
          });
        })
        .catch(error => {
        })
    };

    removeTask = (id) => {
        axios.delete(`http://localhost:3001/task/${id}`)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(error => {
        });   
      };
    

    render() {
        let { task, isEdit } = this.state;
        return (
            <>
                {
                    task ? 
                        <div className='text-center mt-5'>
                            <h3>Title: {task.title}</h3>
                            <h4>Description: {task.description}</h4>
                            <h5>Date: {task.date.slice(0, 10)}</h5>
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
                    : <Spinner />
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