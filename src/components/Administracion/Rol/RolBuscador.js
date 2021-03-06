import React, { useContext, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table,
} from 'reactstrap'
import { rolGetByRol } from '../../../api/rol'
import { Accion, RolEstado } from "./Rol"

export default function RolBuscador() {
  const { dispatch } = useContext(RolEstado);
  const [resultado, setResultado] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });

  const buscarRoles = async () => {
    const respuesta = await rolGetByRol(busqueda)
    setResultado(respuesta)
  }

  const editar = id => e => {
    const rol = resultado.find(rol => rol.id === id)
    actualizarSelecion(rol)
  }

  return (
    <div>
      <Row>
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              ROL BUSCADOR
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-left">
                  <Col md="6">
                    <FormGroup>
                      <label >Rol</label>
                      <Input placeholder="Ingrese nombre" type="text" onChange={(event) => setBusqueda(event.target.value)} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button size="sm" onClick={buscarRoles}>
                    Buscar
                  </Button>
                  <Button className="reset btn-warning" size="sm">
                    Cancelar
                  </Button>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              RESULTADO
            </CardHeader>
            <CardBody>
              <Table className="table">
                <thead className="text-primary">
                  <tr>
                    <th className="header">Rol</th>
                    <th className="header">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resultado.map(dato => <tr key={dato.id}>
                      <td> {dato.nombre} </td>
                      <td> <Button size="sm" onClick={editar(dato.id)}>Editar</Button> </td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}