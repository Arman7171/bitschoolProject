// import React, { PureComponent } from "react";
// import { InputGroup, FormControl, Button } from "react-bootstrap";
// import PropTypes from 'prop-types'


// class NewTask extends PureComponent {
//   state = {
//     inputValue: "",
//   };

//   writeTask = (e) => {
//       if((e.target.value).length > 80 ){
//         this.setState({
//             inputValue: this.state.inputValue
//           });
//       }
//       else{
//         this.setState({
//         inputValue: e.target.value,
//         });
// }
//   };

//   handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       this.sendTask();
//     }
//   };

//   sendTask = () => {
//     const { inputValue } = this.state;
//     if (!inputValue) {
//       return;
//     }
//     this.props.onAdd(inputValue);

//     this.setState({
//       inputValue: "",
//     });
//   };

//   render() {
//     return (
//       <InputGroup className="my-3">
//         <FormControl
//           value={this.state.inputValue}
//           onChange={this.writeTask}
//           onKeyDown={this.handleKeyDown}
//           disabled={this.props.disabled}
//           placeholder="Input task"
//           aria-label="Input task"
//           aria-describedby="basic-addon2"
//         />
//         <InputGroup.Append>
//           <Button 
//             onClick={this.sendTask} 
//             variant="success"
//             disabled={this.props.disabled}
//             >
//             Add task
//           </Button>
//         </InputGroup.Append>
//       </InputGroup>
//     );
//   }
// }

// NewTask.propTypes = {
//   onAdd: PropTypes.func.isRequired
// };

// export default NewTask;

import React, { Component } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import PropTypes from 'prop-types';


class NewTask extends Component {
  state = {
    task: {
      title: '',
      description: '',
      // date: ''
    }
  }

  writeTitle = (e) =>{
    this.setState({
      task: {
        ...this.state.task,
        title: e.target.value,
      }
    });
  };

  writeDescription = (e) =>{
    this.setState({
      task: {
        ...this.state.task,
        description: e.target.value,
      }
    });
  };

  handleSave = () =>{
    this.props.addNewTask(this.state.task)
  }


  render() {
    const { onCancel } = this.props;
    const { task } = this.state;
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
              value={task.title}
              onChange={this.writeTitle}
              placeholder="Input task"
              aria-label="Input task"
              aria-describedby="basic-addon2"
              className='w-75'
            />
            <FormControl
              value={task.description}
              onChange={this.writeDescription}
              placeholder="Input task"
              aria-label="Input task"
              aria-describedby="basic-addon2"
              className='my-4 w-75'
            />
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

// EditModal.propTypes = {
//   task: PropTypes.object.isRequired,
//   onCancel: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired
// };

export default NewTask;
