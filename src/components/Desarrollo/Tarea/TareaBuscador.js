import React, { useContext, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table,
} from 'reactstrap'
import { tareaGetByDescripcion } from '../../../api/tarea'
import { Accion, TareaEstado } from "./Tarea"

export default function TareaBuscador() {
  const { dispatch } = useContext(TareaEstado);
  const [resultado, setResultado] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const inputTarea = (event) => setBusqueda(event.target.value)
  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarABM = () => dispatch({ type: Accion.MOSTRAR_ABM });

  const buscarTareas = async () => {
    const respuesta = await tareaGetByDescripcion(busqueda)
    setResultado(respuesta)
  }

  const editar = id => e => {
    const tarea = resultado.find(tarea => tarea.id === id)
    actualizarSelecion(tarea)
    mostrarABM()
  }

  const nuevo = () => {
    mostrarABM()
  }

  return (
    <div>
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              TAREA BUSCADOR
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-left">
                  <Col md="6">
                    <FormGroup>
                      <label >Tarea</label>
                      <Input placeholder="Ingrese tarea" type="text" onChange={inputTarea} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button size="sm" onClick={buscarTareas}>
                    Buscar
                  </Button>
                  <Button className="reset btn-warning" size="sm">
                    Cancelar
                  </Button>
                  <Button className="btn-success" size="sm" onClick={nuevo}>
                    Nuevo
                  </Button>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              RESULTADO
            </CardHeader>
            <CardBody>
              <Table className="table">
                <thead className="text-primary">
                  <tr>
                    <th className="header">Tarea</th>
                    <th className="header">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resultado.length > 0 ?
                      resultado.map(dato => <tr key={dato.id}>
                        <td> {dato.descripcion} </td>
                        <td> {dato.estado} </td>
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