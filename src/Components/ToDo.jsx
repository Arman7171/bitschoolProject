import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import NewTask from "./NewTask";
import Task from "./Task/Task";
import Confirm from './Confirm'

export default class ToDo extends Component {
  state = {
    tasks: [],
    checkedTask: new Set(),
    showConfirm: false
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
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks,
    });
  };

  handleCheck = (taskId) => () => {
    var checkedTask = new Set(this.state.checkedTask);
    if (checkedTask.has(taskId)) {
      checkedTask.delete(taskId);
    } else checkedTask.add(taskId);
    this.setState({checkedTask});
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm
    })
  }

  removeCheckedTask = () => {
    const checkedTask = new Set(this.state.checkedTask);
    let tasks = [...this.state.tasks];
    checkedTask.forEach(taskId =>{
      tasks = tasks.filter((task) => task.id !== taskId);
    });
    checkedTask.clear();

    this.setState({
      tasks,
      checkedTask,
      showConfirm: !this.state.showConfirm
    });
  };

  render() {
    const { tasks, checkedTask, showConfirm } = this.state;
    const taskComponent = tasks.map((task) => {
      return (
        <Col md={{ span: 8, offset: 2 }} key={task.id}>
          <Task
            data={task}
            onRemove={this.removeTask}
            onCheck={this.handleCheck(task.id)}
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
          count = {checkedTask.size}
          onSubmit = {this.removeCheckedTask}
          onCancel = {this.toggleConfirm}
          />
          }
        </Container>
      </>
    );
  }
}
