import React, { Component, createRef } from "react";
import { Modal, Button, FormControl, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import classes from './style.module.css';
import { connect } from "react-redux";
import { addTask } from '../../Store/task/taskActions';

class NewTask extends Component {
  constructor(props){
    super(props)
      this.state = {
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 10),
        valid: true,
        errorType: null
    };
    this.titleRef = createRef();
  }


componentDidMount(){
  this.titleRef.current.focus();
}

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
    console.log(date);

    let data = {
      title,
      description,
      date: date.toString().slice(0, 10)
    };

    this.props.addTask(data)

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
          <span>Create your task</span>
        </Modal.Header>
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
                ref={this.titleRef}
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
                <input 
                  type="date" 
                  onChange={(e) => this.handleChange('date', e.target.value)}
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
          </Modal.Body>
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
};

const mapDisputchToProps = {
  addTask
};

export default connect(null, mapDisputchToProps)(NewTask);
