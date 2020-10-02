import React, { Component } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import classes from './style.module.css';

class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: this.props.task,
      errorType: null,
      valid: true
    };
  }

  validationErrors = {
    requiredError: 'The field is required!',
    lengthError: 'The Title length shoud be less than 30 characters'
};

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSave()
    }
  };

  handleEdit = (type, value) => {
    if(type==='title' && this.state.valid===false){
    this.setState({
        valid: true,
        errorType: null
    });
  }

  this.setState({
    task: {
      ...this.state.task,
      [type]: value
    }
  });
  };

  handleSave = () => {
    const { task } = this.state;
    if (!task.title) {
      this.setState({
        valid: false,
        errorType: 'requiredError'
      })
      return;
    }

    if(task.title.length>30){
      this.setState({
        errorType: 'lengthError',
        valid: false
      });
      return;
    };

    this.props.onSubmit(task);
  };

  render() {
    const { onCancel } = this.props;
    const { task, valid, errorType } = this.state
    var errorMessage = this.validationErrors[errorType]

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
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={"text-danger"}>{errorMessage}</Form.Label>
              <FormControl
                className={!valid ? classes.invalid : null}
                value={task.title}
                onChange={(e) => this.handleEdit('title', e.target.value)}
                onKeyDown={this.handleKeyDown}
                placeholder="Input task"
                aria-label="Input task"
                aria-describedby="basic-addon2"
              />
            </Form.Group>
             <Form.Control 
              as="textarea" 
              rows="3" 
              className='my-3'
              placeholder='Description'
              value={task.description}
              onChange={(e) => this.handleEdit('description', e.target.value)}
              />
              <div className={classes.datePicker}>
                <DatePicker
                  onChange={(e) => this.handleEdit('date', e)}
                  selected={new Date(task.date)}
                  minDate={new Date()}
                />
              </div>
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
