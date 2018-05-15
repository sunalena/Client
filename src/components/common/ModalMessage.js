import React from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalMessage = ({ isOpen, toggle, header, body, className }) => (
  <Modal isOpen={isOpen} toggle={toggle} className={className}>
    {header && <ModalHeader toggle={toggle}>{header}</ModalHeader>}
    {body && <ModalBody>{body}</ModalBody>}
    <ModalFooter>
      <Button color="primary" onClick={toggle}>
        Ok
      </Button>
    </ModalFooter>
  </Modal>
)

export default ModalMessage
