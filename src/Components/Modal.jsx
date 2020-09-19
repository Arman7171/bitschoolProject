import React, { Component } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import PropTypes from 'prop-types';


class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.task
    };
  }
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSave()
    }
  };

  handleEdit = (e) => {
    if ((e.target.value).length > 120) {
      this.setState({
        inputValue: this.state.inputValue
      });
    }
    else {
      this.setState({
        inputValue: {
          ...this.state.inputValue,
          text: e.target.value
        }
      });
    }
  };

  handleSave = () => {
    const { inputValue } = this.state;
    if (inputValue.text) {
      this.props.onSubmit(inputValue);
    }
    else return;
  };
  render() {
    const { onCancel } = this.props;
    const { inputValue } = this.state
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Body>
            <FormControl
              value={inputValue.text}
              onChange={this.handleEdit}
              onKeyDown={this.handleKeyDown}
              placeholder="Input task"
              aria-label="Input task"
              aria-describedby="basic-addon2"
            />
          </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant='info'>Save</Button>
          <Button onClick={onCancel} variant='secondary'>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditModal.propTypes = {
  task: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditModal;
