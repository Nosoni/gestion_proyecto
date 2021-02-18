import React, { useState } from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button } from 'reactstrap'
import { getUsuario } from '../../api/usuario'

export default function Login(props) {
  //variable local para objeto tipo usuario
  const [usuario, setUsuario] = useState({})

  //evento de validación de usuario
  const login = async () => {
    //si el usuario cargó datos busca en BD
    if (Object.keys(usuario).length > 0) {
      //evento que consume la API
      const response = await getUsuario(usuario);
      //si existe, redirige a la pag principal
      if (response.length > 0)
        props.history.push("/inicio")
      else
        console.log("El usuario no existe")
    } else {
      console.log("Ingrese usuario y contraseña")
    }
  }

  //eventos que actualizan la variable local usuario de tipo objeto
  const usuarioEstado = (event) => setUsuario({ ...usuario, usuario: event.target.value })
  const passwordEstado = (event) => setUsuario({ ...usuario, password: event.target.value })

  return (
    <div className="main">
      <Col>
        <Card>
          <Form >
            <Row className="justify-content-center">
              <Col md="6">
                <FormGroup>
                  <label>Usuario</label>
                  <Input placeholder="Ingrese usuario" type="text" onChange={usuarioEstado} />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="6">
                <FormGroup>
                  <label>Contraseña</label>
                  <Input placeholder="Ingrese contraseña" type="password" onChange={passwordEstado} />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Button
                color="primary"
                type="button"
                onClick={login}
              >
                Ingresar
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </div>)
}