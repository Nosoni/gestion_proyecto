import React, { useContext, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table,
} from 'reactstrap'
import { usuarioGetByUsuario } from '../../../api/usuario'
import { Accion, UsuarioEstado } from "./Usuario"

export default function UsuarioBuscador() {
  const { dispatch } = useContext(UsuarioEstado);
  const [resultado, setResultado] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const inputUsuario = (event) => setBusqueda(event.target.value)
  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });

  const buscarUsuarios = async () => {
    const respuesta = await usuarioGetByUsuario(busqueda)
    setResultado(respuesta)
  }

  const editar = id => e => {
    const usuario = resultado.find(usuario => usuario.id === id)
    actualizarSelecion(usuario)
  }

  return (
    <div>
      <Row>
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              USUARIO BUSCADOR
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-left">
                  <Col md="6">
                    <FormGroup>
                      <label >Usuario</label>
                      <Input placeholder="Ingrese usuario" type="text" onChange={inputUsuario} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button size="sm" onClick={buscarUsuarios}>
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
                    <th className="header">Usuario</th>
                    <th className="header">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    resultado.length > 0 ?
                      resultado.map(dato => <tr key={dato.id}>
                        <td> {dato.usuario} </td>
                        <td> <Button size="sm" onClick={editar(dato.id)}>Editar</Button> </td>
                      </tr>) :
                      <tr>
                        <td> Sin datos... </td>
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