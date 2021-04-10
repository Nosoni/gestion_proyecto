import React, { useContext, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table,
} from 'reactstrap'
import { proyectoGetByProyecto } from '../../../api/proyecto'
import { Accion, ProyectoEstado } from "./Proyecto"

export default function UsuarioBuscador() {
  const { dispatch } = useContext(ProyectoEstado);
  const [resultado, setResultado] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const inputProyecto = (event) => setBusqueda(event.target.value)
  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });

  const buscarProyectos = async () => {
    const respuesta = await proyectoGetByProyecto(busqueda)
    setResultado(respuesta)
  }

  const editar = id => e => {
    const proyecto = resultado.find(proyecto => proyecto.id === id)
    actualizarSelecion(proyecto)
  }

  return (
    <div>
      <Row>
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              PROYECTO BUSCADOR
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-left">
                  <Col md="6">
                    <FormGroup>
                      <label >Proyecto</label>
                      <Input placeholder="Ingrese proyecto" type="text" onChange={inputProyecto} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button size="sm" onClick={buscarProyectos}>
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
                    <th className="header">Nombre</th>
                    <th className="header">Descripción</th>
                    <th className="header">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resultado.length > 0 ?
                      resultado.map(dato => <tr key={dato.id}>
                        <td> {dato.nombre} </td>
                        <td> {dato.descripcion} </td>
                        <td> <Button size="sm" onClick={editar(dato.id)}>Editar</Button> </td>
                      </tr>) :
                      <tr>
                        <td> Sin datos... </td>
                        <td />
                        <td />
                      </tr>
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