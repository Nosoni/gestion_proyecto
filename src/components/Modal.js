import React from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

export default function ModalIS(params) {
  const {
    mostrar,
    eventoCancelar,
    eventoAceptar,
    titulo,
    cuerpo,
  } = params;

  const cancelar = () => eventoCancelar();
  const aceptar = () => eventoAceptar();

  return (<div>
    <div>
      <Modal isOpen={mostrar} toggle={cancelar}>
        <ModalHeader toggle={cancelar}>{titulo}</ModalHeader>
        <ModalBody>
          {cuerpo}
        </ModalBody>
        <ModalFooter>
          <Button className="btn-danger" onClick={aceptar}>Aceptar</Button>
          <Button className="btn-success" onClick={cancelar}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  </div>)
}

