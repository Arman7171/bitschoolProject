import React, { Component, createRef } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import classes from './style.module.css';

class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.task.title,
      date: props.task.date.slice(0, 10),
      description: props.task.description,
      _id:  props.task._id,
      errorType: null,
      valid: true
    };

    this.titleRef = createRef();
  };

  componentDidMount(){
    this.titleRef.current.focus();
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

  if(type==='date'){
    value = value.toString().slice(0, 10)
  }

  this.setState({
      [type]: value 
    });
  };

  handleSave = () => {
    const { title, description, date, _id } = this.state;
    if (!title) {
      this.setState({
        valid: false,
        errorType: 'requiredError'
      })
      return;
    }

    if(title.length>30){
      this.setState({
        errorType: 'lengthError',
        valid: false
      });
      return;
    };

  const data = {
    title,
    description,
    date,
    _id
  }

    this.props.onSubmit(data);
  };

  render() {
    const { onCancel } = this.props;
    const { date, title, description, valid, errorType } = this.state
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
          <span>Edit your task</span>
        </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={"text-danger"}>{errorMessage}</Form.Label>
              <FormControl
                className={!valid ? classes.invalid : null}
                value={title}
                onChange={(e) => this.handleEdit('title', e.target.value)}
                onKeyDown={this.handleKeyDown}
                placeholder="Input task"
                aria-label="Input task"
                aria-describedby="basic-addon2"
                ref={this.titleRef}
              />
            </Form.Group>
             <Form.Control 
              as="textarea" 
              rows="3" 
              className='my-3'
              placeholder='Description'
              value={description}
              onChange={(e) => this.handleEdit('description', e.target.value)}
              />
              <div className={classes.datePicker}>
              <input 
                  type="date" 
                  onChange={(e) => this.handleEdit('date', e.target.value)}
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
          </Modal.Body>
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
