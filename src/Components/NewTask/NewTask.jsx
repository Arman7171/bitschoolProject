import React, { Component } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import classes from './style.module.css';

class NewTask extends Component {
  state = {
      title: '',
      description: '',
      date: new Date(),
      valid: true,
      errorType: null
  };

  validationErrors = {
    requiredError: 'The field is required!',
    lengthError: 'The Title length shoud be less than 30 characters'
};

  handleChange = (type, value) =>{
    if(type==='title' && this.state.valid === false){
      this.setState({
        valid: true,
        errorType: null
      })
    }

    this.setState({
      [type]: value
    });

  };

  handleSave = () =>{
    let { title, description, date } = this.state;
    title = title.trim();
    if(!title){
      this.setState({
        errorType: 'requiredError',
        valid: false
      });
      return;
    };

    if(title.length>30){
      this.setState({
        errorType: 'lengthError',
        valid: false
      });
      return;
    };

    let data = {
      title,
      description,
      date: date.toISOString().slice(0, 10)
    };

    this.props.addNewTask(data)

  };


  render() {
    const { onCancel } = this.props;
    const { description, date, valid, errorType } = this.state;
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
                value={this.state.title}
                onChange={(event) => this.handleChange('title', event.target.value)}
                onKeyDown={this.handleKeyDown}
                placeholder="Title"
                aria-label="Title"
                aria-describedby="basic-addon2"
              />
            </Form.Group>
            <Form.Control 
              as="textarea" 
              rows="3" 
              className='my-3'
              placeholder='Description'
              value={description}
              onChange={(e) => this.handleChange('description', e.target.value)}
              />
              <div className={classes.datePicker}>
                <DatePicker
                  onChange={(e) => this.handleChange('date', e)}
                  selected={date}
                  minDate={new Date()}
                />
              </div>
          </Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant='info'>Add</Button>
          <Button onClick={onCancel} variant='secondary'>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewTask.propTypes = {
  onCancel: PropTypes.func.isRequired,
  addNewTask: PropTypes.func.isRequired
};

export default NewTask;
