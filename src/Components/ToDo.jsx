import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import idGenerator from "../helpers/idGenerator";
import NewTask from './NewTask';
import Task from './Task/Task'
export default class ToDo extends Component {
  state = {
    tasks: [],
  };

  addTask = (inputValue) => {
    console.log(inputValue);
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
    const newTasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({
            tasks: newTasks
        });
  };

  render() {
    const { tasks } = this.state
    const taskComponent = this.state.tasks.map((task) => {
      return(
        <Col md={{ span: 8, offset: 2 }} key={task.id}>
          <Task data={task} onRemove={this.removeTask} />
        </Col>
      );
    });
    return (
      <>
        <Container fluid={true}>
            <h1 className='text-center text-info'>ToDo Application</h1>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <NewTask onAdd={this.addTask} />
            </Col>
          </Row>
          <Row>
            {taskComponent}
          </Row>
        </Container>
      </>
    );
  }
}
