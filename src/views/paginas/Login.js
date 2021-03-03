import { getAllProyecto } from '../../api/proyecto';
import { getByUsuarioProyecto } from '../../api/usuarioRolProyecto';
import { useSesion } from 'context';
import React, { useEffect, useState } from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button, Alert } from 'reactstrap'
import { getByUsuarioPass } from '../../api/usuario'
import Select from 'react-select';
import { getViewByRol } from '../../api/rolPermiso';

export default function Login(props) {
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
    let opciones = response.map(dato => { return { value: dato.id, label: dato.nombre } })
    if (response.length > 0)
      setProyecto(opciones)
  }

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
    const response = await getByUsuarioPass(usuario);
    if (response.length > 0) {
      //busca el rol del usuario según el proyecto
      const usuarioRol = await getByUsuarioProyecto(response[0].id, proyectoSeleccionado)
      //busca permisos por rol y asignar a variables de sesion
      const permisos = await getViewByRol(usuarioRol[0].rol_id)
        .then(response =>
          response.map(registro => {
            return {
              permiso: registro.permiso_nombre
            }
          })
        )

      //TODO MEJORAR PASO DE PERMISOS
      sesion.actualizarValores(permisos)
      console.log(sesion)
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