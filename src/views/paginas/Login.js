import React, { useEffect, useState } from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button, Alert } from 'reactstrap'
import { getUsuario } from '../../api/usuario'

export default function Login(props) {
  //variable local para objeto tipo usuario
  const [usuario, setUsuario] = useState({})
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  //evento de validación de usuario
  const login = async () => {
    //validar que ingresó algo
    if (!usuario.usuario || usuario.usuario.length === 0) {
      setError("Ingrese usuario")
      return;
    }
    if (!usuario.password || usuario.usuario.password === 0) {
      setError("Ingrese contraseña")
      return;
    }
    //si el usuario cargó datos busca en BD
    //evento que consume la API
    const response = await getUsuario(usuario);
    //si existe, redirige a la pag principal
    if (response.length > 0)
      props.history.push("/inicio")
    else
      setError("El usuario no existe")
  }

  useEffect(() => {
    error.length > 0 ? setShowError(true) : setShowError(false)
  }, [error])

  //eventos que actualizan la variable local usuario de tipo objeto
  const usuarioEstado = (event) => setUsuario({ ...usuario, usuario: event.target.value })
  const passwordEstado = (event) => setUsuario({ ...usuario, password: event.target.value })

  return (
    <div className="main">
      <div className="container-xl">
        <Alert color="danger" isOpen={showError} toggle={() => setError("")}>
          <span>
            {error}
          </span>
        </Alert>
      </div>
      <Col className="pt-md row align-items-center justify-content-center">
        <Card className="card-log">
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