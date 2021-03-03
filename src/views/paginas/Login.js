import { getAllProyecto } from '../../api/proyecto';
import { getByUsuarioProyecto } from '../../api/usuarioRolProyecto';
import { useSesion } from '../../context';
import React, { useEffect, useState } from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button, Alert } from 'reactstrap'
import { getByUsuarioPass } from '../../api/usuario'
import Select from 'react-select';
import { getViewByRol } from '../../api/rolPermiso';

export default function Login(props) {
  //variable global
  let sesion = useSesion();
  //variable local para objeto tipo usuario
  const [usuario, setUsuario] = useState({})
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [proyecto, setProyecto] = useState([])
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState()

  useEffect(() => {
    error.length > 0 ? setShowError(true) : setShowError(false)
  }, [error])

  useEffect(() => {
    if (proyecto.length === 0)
      buscarProyecto()
  })

  const buscarProyecto = async () => {
    const response = await getAllProyecto();
    if (response.length > 0) {
      let opciones = response.map(dato => { return { value: dato.id, label: dato.nombre } })
      setProyecto(opciones)
    }
  }

  /* Validación de carga de credenciales
   * Búsqueda de usuario
   * Se optiene permisos según usuario - rol - proyecto
   * Se actualiza variable de sesión */
  const login = async () => {
    // TODO, validar proyecto

    // if (!usuario.usuario || usuario.usuario.length === 0) {
    //   setError("Ingrese usuario")
    //   return;
    // }
    // if (!usuario.password || usuario.usuario.password === 0) {
    //   setError("Ingrese contraseña")
    //   return;
    // }
    const response = await getByUsuarioPass({ usuario: "frecalde", password: "frecalde" });
    if (response.length > 0) {
      const usuarioRol = await getByUsuarioProyecto(response[0].id, proyectoSeleccionado)
      const permisos = await getViewByRol(usuarioRol[0].rol_id).then(respuesta => {
          return respuesta.map(registro => registro.permiso_nombre)
        })

      sesion.actualizarValores({ type: "usuario", payload: response[0].usuario })
      sesion.actualizarValores({ type: "proyecto", payload: proyectoSeleccionado })
      sesion.actualizarValores({ type: "permisos", payload: permisos })
      props.history.push("/inicio")
    }
    else {
      setError("El usuario no existe")
    }
  }

  //eventos que actualizan la variable local usuario de tipo objeto
  const usuarioEstado = (event) => setUsuario({ ...usuario, usuario: event.target.value })
  const passwordEstado = (event) => setUsuario({ ...usuario, password: event.target.value })
  const proyectoEstado = (valor) => setProyectoSeleccionado(valor)

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
              <Col md="6">
                <FormGroup>
                  <label>Proyecto</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={proyecto[1]}
                    options={proyecto}
                    onChange={(seleccion) => proyectoEstado(seleccion.value)}
                    name="proyecto"
                  />
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