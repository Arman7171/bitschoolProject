import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import NewTask from "./NewTask";
import Task from "./Task/Task";
import Confirm from './Confirm';
import EditModal from './Modal';
import axios from 'axios';

export default class ToDo extends Component {
  state = {
    tasks: [],
    checkedTask: new Set(),
    showConfirm: false,
    showNewTaskModal: false,
    editTask: null
  };

  componentDidMount(){
    axios.get('http://localhost:3001/task')
    .then(res => {
      console.log(res);
      var tasks = this.state.tasks;
      tasks = res.data;
      this.setState({
        tasks
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  addTask = (task) => {
    console.log(task);
  let { tasks } = this.state;
    axios.post('http://localhost:3001/task',task)
    .then(res => {
      console.log(res);
      this.setState({
        tasks: [
          {
            title: res.data.title,
            description: res.data.description,
            date: res.data.date,
            _id: res.data._id,
          },  
          ...tasks,
        ],
        showNewTaskModal: !this.state.showNewTaskModal
      });
    })
    .catch(error => {
      console.log(error);
    })

  };

  showTask = () =>{
    this.setState({
      showNewTaskModal: !this.state.showNewTaskModal
    });
  };

  removeTask = (id) => {
    axios.delete(`http://localhost:3001/task/${id}`)
    .then(res => {
      console.log(res);
      const newTasks = this.state.tasks.filter((task) => task._id !== id);
      this.setState({
        tasks: newTasks,
      });
    })
    .catch(error => {
      console.log(error);
    })
   
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
    const checkedTask = new Set(this.state.checkedTask);
    let tasks = [...this.state.tasks];
    checkedTask.forEach(taskId => {
      tasks = tasks.filter((task) => task._id !== taskId);
    });
    checkedTask.clear();

    this.setState({
      tasks,
      checkedTask,
      showConfirm: !this.state.showConfirm
    });
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
    axios.put(`http://localhost:3001/task/${newTask._id}`, newTask)
    .then(res => {
      console.log(res);
      const tasks = [...this.state.tasks];
      var index = tasks.findIndex((task) => task._id === newTask._id);
      tasks[index].title = newTask.title;
      this.setState({
        tasks,
        editTask: null
      });
    })
    .catch(error => {
      console.log(error);
    })
  };

  render() {
    const { tasks, checkedTask, showConfirm, editTask, showNewTaskModal } = this.state;
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
      <>
        <Container fluid={true}>
          <h1 className="text-center text-info">ToDo Application</h1>
          <Row>
            <Col md={{ span: 6, offset: 3 }} className='text-center'>
              <Button 
                className='my-3 w-25 py-2'
                onClick={this.showTask}
                disabled={checkedTask.size ? true : false}
                >
                Add Task
              </Button>
              {showNewTaskModal &&
              <NewTask 
                onAdd={this.addTask}
                addNewTask={this.addTask}
                onCancel={this.showTask}
                />
              }
            </Col>
          </Row>
          <Row>{taskComponent}</Row>
          <Row className='justify-content-center'>
            <Button
              variant="danger"
              disabled={checkedTask.size ? false : true}
              onClick={this.toggleConfirm}
            >
              Delete checked
          </Button>
          </Row>
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
      </>
    );
  }
}
