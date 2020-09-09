import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import classes from "./todo.module.css";
import idGenerator from "../../helpers/idGenerator";

export default class ToDo extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  writeTask = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addTask = () => {
    let { tasks, inputValue } = this.state;
    this.setState({
      tasks: [
        {
          text: inputValue,
          id: idGenerator(),
        },
        ...tasks,
      ],
      inputValue: "",
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  removeTask = (index) => {
    let tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({
      tasks,
    });
  };

  render() {
    const { tasks } = this.state;
    return (
      <>
        <Container fluid={true}>
            <h1 className='text-center text-info'>ToDo Application</h1>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <InputGroup className="my-3">
                <FormControl
                  value={this.state.inputValue}
                  onChange={this.writeTask}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Input task"
                  aria-label="Input task"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button onClick={this.addTask} variant="success">
                    Add task
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {tasks.map((task, index) => {
              return (
                <Col md={{ span: 8, offset: 2 }} key={task.id}>
                  <div className={classes.task}>
                    <div className={classes.taskText}>
                      <input type="checkbox" name="" id="" />
                      <span className="pl-3"> {task.text} </span>
                    </div>
                    <div className={classes.remove}>
                      <Button
                        onClick={() => this.removeTask(index)}
                        variant="danger"
                      >
                        X
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}
