import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table, Alert
} from 'reactstrap'
import { Accion, UsuarioEstado } from './Usuario';
import { usuarioCrear, usuarioDeleteById, usuarioActualizar, usuarioGetByUsuario } from '../../../api/usuario'
import Select from 'react-select';
import { rolGetAll } from '../../../api/rol';
import { usuarioRolAsignar, usuarioRolDeshabilitar, usuarioRolViewGetByUsuario } from '../../../api/usuarioRol';
import ModalIS from '../../../components/Modal';

export default function UsuarioABM() {
  const { state, dispatch } = useContext(UsuarioEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [usuarioLocal, setUsuarioLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [rolAsignar, setRolAsignar] = useState()
  const [rolesDelUsuario, setRolesDelUsuario] = useState([])
  const [showAlerta, setShowAlerta] = useState(false)
  const [alerta, setAlerta] = useState({ mensaje: "", type: "" })
  const [showModal, setShowModal] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#172b4d",
    }),
  }

  useEffect(() => {
    alerta.mensaje.length > 0 ? setShowAlerta(true) : setShowAlerta(false)
  }, [alerta])

  const buscarRoles = async () => {
    const respuesta = await rolGetAll()
    let opciones = respuesta.map(dato => { return { value: dato.id, label: dato.nombre } })
    setSelectOpciones(opciones)
  }

  const buscarRolUsuario = async () => {
    const respuesta = await usuarioRolViewGetByUsuario(valoresIniciales.id)
    setRolesDelUsuario(respuesta)
  }

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  useEffect(() => {
    buscarRoles()
    if (valoresIniciales.id) {
      buscarRolUsuario()
    }
  }, [valoresIniciales])

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarBuscador = () => dispatch({ type: Accion.MOSTRAR_BUSCADOR });

  const crearUsuario = async () => {
    try {
      if (!usuarioLocal.usuario || usuarioLocal.usuario.length === 0) {
        throw new Error("Ingresar usuario");
      }
      if (!usuarioLocal.password || usuarioLocal.usuario.password === 0) {
        throw new Error("Ingresar contraseña");
      }
      await usuarioCrear(usuarioLocal)
      setAlerta({ mensaje: "Creado con éxito", type: "success" })
      const actualizado = await usuarioGetByUsuario(usuarioLocal.usuario)
      actualizarSelecion(actualizado[0])
      setUsuarioLocal({})
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const editarUsuario = async () => {
    try {
      if (!usuarioLocal.usuario || usuarioLocal.usuario.length === 0) {
        throw new Error("Ingresar usuario");
      }
      if (!usuarioLocal.password || usuarioLocal.usuario.password === 0) {
        throw new Error("Ingresar contraseña");
      }
      await usuarioActualizar({ ...usuarioLocal, id: valoresIniciales.id })
      setAlerta({ mensaje: "Actualizado con éxito", type: "info" })
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const seleccionarUsuarioEliminar = () => {
    setShowModal(true)
  }

  const eliminarUsuario = async () => {
    try {
      await usuarioDeleteById(valoresIniciales.id)
      setShowModal(false)
      actualizarSelecion({})
      setUsuarioLocal({})
      setRolesDelUsuario({})
      mostrarBuscador()
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const ocultarModal = () => {
    setShowModal(false)
  }

  const cancelar = () => {
    actualizarSelecion({})
    mostrarBuscador()
  }

  const asignarRol = async () => {
    try {
      if (!rolAsignar) {
        throw Error("Favor asignar un rol")
      }
      await usuarioRolAsignar({ usuario_id: valoresIniciales.id, rol_id: rolAsignar })
      buscarRolUsuario();
      setAlerta({ mensaje: "Asignado con éxito", type: "success" })
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const deshabilitarRol = (usuario_rol_id) => e => {
    deshabilitar(usuario_rol_id)
  }

  const deshabilitar = async (id) => {
    try {
      await usuarioRolDeshabilitar(id)
      setAlerta({ mensaje: "Rol eliminado con éxito", type: "info" })
      buscarRolUsuario();
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  return (<div className="main">
    <div className="container-sm">
      <Alert color={alerta.type} isOpen={showAlerta} toggle={() => setAlerta({ mensaje: "", type: "" })}>
        <span>
          {alerta.mensaje}
        </span>
      </Alert>
    </div>
    <Row className="justify-content-center">
      <Col lg="6" xl="6">
        <Card className="card-user">
          <CardHeader className="card-header">
            FORMULARIO USUARIO
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label >Usuario</label>
                    <Input defaultValue={valoresIniciales.usuario}
                      placeholder="Ingrese usuario"
                      type="text"
                      onChange={(evento) => { setUsuarioLocal({ ...usuarioLocal, usuario: evento.target.value }) }} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label >Contraseña</label>
                    <Input defaultValue={valoresIniciales.password}
                      placeholder="Ingrese contraseña"
                      type="password"
                      onChange={(evento) => { setUsuarioLocal({ ...usuarioLocal, password: evento.target.value }) }} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {
                  valoresIniciales.id ?
                    <>
                      <Button size="sm" onClick={() => editarUsuario()}> Editar </Button>
                      <Button className="btn-danger" size="sm" onClick={() => seleccionarUsuarioEliminar()}> Eliminar </Button>
                    </> :
                    <Button size="sm" onClick={() => crearUsuario()}> Crear </Button>
                }
                <Button className="btn-warning" size="sm" onClick={cancelar}> Cancelar </Button>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col lg="6" xl="6">
        <Card className="card-user">
          <CardHeader className="card-header">
            ROLES DEL USUARIO
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col lg="1" xl="1">
                <label>Rol</label>
              </Col>
              <Col lg="6" xl="6">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={selectOpciones}
                  onChange={(seleccion) => setRolAsignar(seleccion.value)}
                  name="rol"
                  styles={customStyles}
                />
              </Col>
              <Col lg="3" xl="3">
                <Button size="sm" disabled={!valoresIniciales.id} onClick={asignarRol}>Asignar Rol</Button>
              </Col>
            </Row>
            <Row>
              <Table className="table">
                <thead className="text-primary">
                  <tr>
                    <th className="header">Rol</th>
                    <th className="header">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rolesDelUsuario.length > 0 ?
                      rolesDelUsuario.map(dato =>
                        <tr key={dato.usuario_rol_id}>
                          <td> {dato.nombre} </td>
                          <td> <Button size="sm" onClick={deshabilitarRol(dato.usuario_rol_id)}>Eliminar</Button> </td>
                        </tr>
                      ) :
                      <>
                        <tr>
                          <td> Sin datos... </td>
                          <td />
                          <td />
                        </tr>
                      </>
                  }
                </tbody>
              </Table>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <ModalIS
      mostrar={showModal}
      eventoAceptar={eliminarUsuario}
      eventoCancelar={ocultarModal}
      titulo="Atención"
      cuerpo="¿Desea eliminar?" />
  </div>)
}