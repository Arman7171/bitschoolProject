import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import NewTask from "./NewTask";
import Task from "./Task/Task";
import Confirm from './Confirm';
import EditModal from './Modal'

export default class ToDo extends Component {
  state = {
    tasks: [],
    checkedTask: new Set(),
    checkedTaskCount: 0,
    showConfirm: false,
    editTask: null
  };

  addTask = (inputValue) => {
    let { tasks } = this.state;
    this.setState({
      tasks: [
        {
          text: inputValue,
          id: idGenerator(),
        },
        ...tasks,
      ],
    });
  };

  removeTask = (id) => {
    var checkedTask = new Set(this.state.checkedTask);
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    if (checkedTask.has(id)) {
      checkedTask.delete(id);
    }
    this.setState({
      tasks: newTasks,
      checkedTask
    });
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
      tasks = tasks.filter((task) => task.id !== taskId);
    });
    checkedTask.clear();

    this.setState({
      tasks,
      checkedTask,
      checkedTaskCount: 0,
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
    const tasks = [...this.state.tasks];
    var index = tasks.findIndex((task) => task.id === newTask.id);
    tasks[index].text = newTask.text;
    this.setState({
      tasks,
      editTask: null
    });
  };

  render() {
    const { tasks, checkedTask, showConfirm, editTask } = this.state;
    const taskComponent = tasks.map((task) => {
      return (
        <Col md={{ span: 8, offset: 2 }} key={task.id}>
          <Task
            data={task}
            onRemove={this.removeTask}
            onCheck={this.handleCheck(task.id)}
            onEdit={this.editTask(task)}
          />
        </Col>
      );
    });
    return (
      <>
        <Container fluid={true}>
          <h1 className="text-center text-info">ToDo Application</h1>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <NewTask onAdd={this.addTask} />
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
