import React, { PureComponent } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import PropTypes from 'prop-types'


class NewTask extends PureComponent {
  state = {
    inputValue: "",
  };

  writeTask = (e) => {
      if((e.target.value).length > 120 ){
        this.setState({
            inputValue: this.state.inputValue
          });
      }
      else{
        this.setState({
        inputValue: e.target.value,
        });
}
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.sendTask();
    }
  };

  sendTask = () => {
    const { inputValue } = this.state;
    if (!inputValue) {
      return;
    }
    this.props.onAdd(inputValue);

    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
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
          <Button onClick={this.sendTask} variant="success">
            Add task
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

NewTask.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default NewTask;
