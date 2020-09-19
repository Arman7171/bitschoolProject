import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types'

function Confirm(props) {
    const {count, onCancel, onSubmit} = props;

 return (
     <Modal
       {...props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
       show = {true}
       onHide={onCancel}
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           Are you sure to remove {count} tasks?
         </Modal.Title>
       </Modal.Header>
       <Modal.Footer>
         <Button onClick={onSubmit} variant='warning'>Remove</Button>
         <Button onClick={onCancel} variant='secondary'>Cancel</Button>
       </Modal.Footer>
     </Modal>
   );
}


Confirm.propTypes = {
  count: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
  };

export default Confirm;
