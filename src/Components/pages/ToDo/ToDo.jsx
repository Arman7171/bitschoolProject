import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewTask from "../../NewTask/NewTask";
import Task from "../../Task/Task";
import Confirm from '../../Confirm';
import EditModal from '../../EditTask/EditModal';
import classes from './todo.module.css';
import Search from '../../Search/Search';
import { connect } from "react-redux";
import { getTasks, editTask, removeTask, removeTasks } from '../../../Store/task/taskActions';

class ToDo extends Component {
  state = {
    tasks: [],
    checkedTask: new Set(),
    showConfirm: false,
    showNewTaskModal: false,
    editTask: null
  };

  componentDidMount(){
    this.props.getTasks();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
      this.setState({
        showNewTaskModal: !this.state.showNewTaskModal
      });
    }
    if(!prevProps.removeTasksSuccess && this.props.removeTasksSuccess){
      this.setState({
        showConfirm: !this.state.showConfirm,
        checkedTask: new Set()
      });
    }
  }

  showTask = () =>{
    this.setState({
      showNewTaskModal: !this.state.showNewTaskModal
    });
  };

  removeTask = (id) => {
    this.props.removeTask(id);
  };

  handleCheck = (taskId) => () => {
    var checkedTask = new Set(this.state.checkedTask);
    if (checkedTask.has(taskId)) {
      checkedTask.delete(taskId);
    } else checkedTask.add(taskId);
    this.setState({ checkedTask });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
      checkedTaskCount: this.state.checkedTask.size
    })
  };

  removeCheckedTask = () => {

    const checkedTasks = [...this.state.checkedTask];
    this.props.removeTasks({tasks: checkedTasks})
    
  };

  editTask = (task) => () => {
    this.setState({
      editTask: task
    });
  };

  toggleModal = () => {
    this.setState({
      editTask: null
    });
  };

  editSelectedTask = (newTask) => {
    this.props.editTask(newTask);
       this.setState({
        editTask: null
      });
  };

  render() {
    const { checkedTask, showConfirm, editTask, showNewTaskModal } = this.state;
    const { tasks } = this.props;
    const taskComponent = tasks.map((task) => {
      return (
        <Col md={{ span: 8, offset: 2 }} key={task._id}>
          <Task
            data={task}
            onRemove={this.removeTask}
            onCheck={this.handleCheck(task._id)}
            onEdit={this.editTask(task)}
            disabled={checkedTask.size ? true : false}
          />
        </Col>
      );
    });
    return (
      <div className={classes.contentMinHeight}>
        <Container>
          <h6 className={`text-dark ${classes.headTitle}`}>Getstarted your task message</h6>
          <Search />
          <div className='text-right'>
          <Button 
                className='my-3 py-2'
                onClick={this.showTask}
                disabled={checkedTask.size ? true : false}
                >
                Add Task
              </Button>
            <Button
              variant="danger"
              className='mx-2 py-2'
              disabled={checkedTask.size ? false : true}
              onClick={this.toggleConfirm}
            >
              Delete checked
          </Button>
          </div>
              {showNewTaskModal &&
                <NewTask 
                  onCancel={this.showTask}
                />
              }
          <Row className={classes.scroll}>{taskComponent}</Row>
          {showConfirm &&
            <Confirm
              count={checkedTask.size}
              onSubmit={this.removeCheckedTask}
              onCancel={this.toggleConfirm}
            />
          }
          {
            !!editTask &&
            <EditModal
              onCancel={this.toggleModal}
              onSubmit={this.editSelectedTask}
              task={editTask}
            />
          }
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
    addTaskSuccess: state.taskReducer.addTaskSuccess,
    removeTasksSuccess: state.taskReducer.removeTasksSuccess
  }
};

const mapDisputchToProps = {
  getTasks: getTasks,
  editTask: editTask,
  removeTask: removeTask,  
  removeTasks: removeTasks,
};

export default connect(mapStateToProps, mapDisputchToProps)(ToDo);