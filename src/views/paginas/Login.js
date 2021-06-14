import React, { useEffect, useState } from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button, Alert } from 'reactstrap'
import { useSesion } from '../../context';
import { usuarioGetByUsuarioPass } from '../../api/usuario'
import { usuarioRolGetByUsuario } from '../../api/usuarioRol';
import { rolPermisoViewGetByRol } from '../../api/rolPermiso';
import "assets/css/nucleo-icons.css";

export default function Login(props) {
  //variable global
  let sesion = useSesion();
  //variable local para objeto tipo usuario
  const [usuario, setUsuario] = useState({})
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    error.length > 0 ? setShowError(true) : setShowError(false)
  }, [error])

  /* Validación de carga de credenciales
   * Búsqueda de usuario
   * Se obtiene rol por usuario
   * Se obtiene permisos según usuario - rol
   * Se actualiza variable de sesión */
  const login = async () => {
    // TODO, validar proyecto
    if (!usuario.usuario || usuario.usuario.length === 0) {
      setError("Ingrese usuario")
      return;
    }
    if (!usuario.password || usuario.usuario.password === 0) {
      setError("Ingrese contraseña")
      return;
    }
    const response = await usuarioGetByUsuarioPass(usuario);
    if (response.length > 0) {
      sesion.actualizarValores({ type: "usuario", payload: response[0].usuario })
      const usuarioRol = await usuarioRolGetByUsuario(response[0].id)
      if (usuarioRol.length > 0) {
        const permisos = await rolPermisoViewGetByRol(usuarioRol[0].rol_id).then(respuesta => {
          return respuesta.map(registro => registro.permiso_nombre)
        })
        sesion.actualizarValores({ type: "permisos", payload: permisos })
      }
      props.history.push("/inicio")
    }
    else {
      setError("El usuario no existe")
    }
  }

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
        <Card className="card-log bg-white">
          <Row className="justify-content-center"> 
            <div class="icon" style={{color:'#fc525c'}}>
              <i class="fas fa-user-alt fa-5x"></i>
            </div>
          </Row> 
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