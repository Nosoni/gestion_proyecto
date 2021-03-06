import React, { useContext, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button
} from 'reactstrap'
import { Accion, RolEstado } from './Rol';
import { rolCrear, rolDeleteById } from '../../../api/rol'

export default function RolABM() {
  const { state, dispatch } = useContext(RolEstado);
  const valoresIniciales = state.seleccionado
  const [rolLocal, setRolLocal] = useState({})
  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });

  const crearRol = async () => {
    try {
      if (!rolLocal.nombre || rolLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await rolCrear(rolLocal)
    } catch (error) {
      console.log("ocurrio un error")
    }
  }
  const eliminarRol = async () => {
    try {
      await rolDeleteById(valoresIniciales.id)
      actualizarSelecion({})
      setRolLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  return (<div>
    <Row className="justify-content-center">
      <Col lg="6" xl="6">
        <Card className="card-user">
          <CardHeader className="card-header">
            FORMULARIO ROL
          </CardHeader>
          <CardBody>
            <Form>
              <Row className="justify-content-center">
                <Col md="6">
                  <FormGroup>
                    <label >Nombre</label>
                    <Input defaultValue={valoresIniciales.nombre}
                      placeholder="Ingrese nombre"
                      type="text"
                      onChange={(evento) => { setRolLocal({ ...rolLocal, nombre: evento.target.value }) }} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Button size="sm" onClick={() => crearRol()}>
                  {valoresIniciales.id ? <>Editar</> : <>Crear</>}
                </Button>
                <Button className="btn-danger" size="sm" onClick={() => eliminarRol()}>
                  Eliminar
                </Button>
                <Button className="btn-warning" size="sm" onClick={() => actualizarSelecion({})}>
                  Cancelar
                </Button>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>)
}