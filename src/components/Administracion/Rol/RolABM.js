import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table, Alert
} from 'reactstrap'
import { Accion, RolEstado } from './Rol';
import { rolCrear, rolDeleteById, rolActualizar, rolGetByRol } from '../../../api/rol'
import Select from 'react-select';
import { permisoGetAll } from '../../../api/permiso';
import { rolPermisoAsignar, rolPermisoDeshabilitar, rolPermisoViewGetByRol } from '../../../api/rolPermiso';
import ModalIS from '../../../components/Modal';

export default function RolABM() {
  const { state, dispatch } = useContext(RolEstado);
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState({ mensaje: "", type: "" })
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [rolLocal, setRolLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [permisoAsignar, setPermisoAsignar] = useState()
  const [permisosDelRol, setPermisosDelRol] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    error.mensaje.length > 0 ? setShowError(true) : setShowError(false)
  }, [error])

  const buscarPermisos = async () => {
    const respuesta = await permisoGetAll()
    let opciones = respuesta.map(dato => { return { value: dato.id, label: dato.nombre } })
    setSelectOpciones(opciones)
  }

  const buscarPermisoRol = async () => {
    const respuesta = await rolPermisoViewGetByRol(valoresIniciales.id)
    setPermisosDelRol(respuesta)
  }

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  useEffect(() => {
    buscarPermisos()
    if (valoresIniciales.id) {
      buscarPermisoRol()
    }
  }, [valoresIniciales])

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarBuscador = () => dispatch({ type: Accion.MOSTRAR_BUSCADOR });

  const crearRol = async () => {
    try {
      if (!rolLocal.nombre || rolLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await rolCrear(rolLocal)
      setError({ mensaje: "Creado con éxito", type: "success" })
      const actualizado = await rolGetByRol(rolLocal.nombre)
      actualizarSelecion(actualizado[0])
      setRolLocal({})
    } catch (error) {
      setError({ mensaje: error.message, type: "danger" })
    }
  }

  const editarRol = async () => {
    try {
      if (!rolLocal.nombre || rolLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await rolActualizar({ ...rolLocal, id: valoresIniciales.id })
      setError({ mensaje: "Actualizado con éxito", type: "info" })
    } catch (error) {
      setError({ mensaje: error.message, type: "danger" })
    }
  }

  const seleccionarRolEliminar = () => {
    setShowModal(true)
  }

  const eliminarRol = async () => {
    try {
      await rolDeleteById(valoresIniciales.id)
      setShowModal(false)
      setRolLocal({})
      setPermisosDelRol([])
      actualizarSelecion({})
      mostrarBuscador()
    } catch (error) {
      setError({ mensaje: error.message, type: "danger" })
    }
  }

  const ocultarModal = () => {
    setShowModal(false)
  }

  const cancelar = () => {
    actualizarSelecion({})
    mostrarBuscador()
  }

  const asignarPermiso = async () => {
    try {
      await rolPermisoAsignar({ rol_id: valoresIniciales.id, permiso_id: permisoAsignar })
      buscarPermisoRol();
      setError({ mensaje: "Asignado con éxito", type: "success" })
    } catch (error) {
      setError({ mensaje: error.message, type: "danger" })
    }
  }

  const deshabilitarPermiso = (id) => e => {
    deshabilitar(id)
  }

  const deshabilitar = async (id) => {
    try {
      await rolPermisoDeshabilitar(id)
      setError({ mensaje: "Permiso eliminado con éxito", type: "info" })
      buscarPermisoRol();
    } catch (error) {
      setError({ mensaje: error.message, type: "danger" })
    }
  }

  return (
    <div className="main">
      <div className="container-sm">
        <Alert color={error.type} isOpen={showError} toggle={() => setError({})}>
          <span>
            {error.mensaje}
          </span>
        </Alert>
      </div>
      <Row className="justify-content-center">
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              FORMULARIO ROL
            </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-center">
                  <Col md="6">
                    <FormGroup>
                      <label >Nombre</label>
                      <Input defaultValue={valoresIniciales.nombre}
                        placeholder="Ingrese nombre"
                        type="text"
                        onChange={(evento) => { setRolLocal({ ...rolLocal, nombre: evento.target.value }) }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  {
                    valoresIniciales.id ?
                      <>
                        <Button size="sm" onClick={() => editarRol()}> Editar </Button>
                        <Button className="btn-danger" size="sm" onClick={() => seleccionarRolEliminar()}> Eliminar </Button>
                      </> :
                      <Button size="sm" onClick={() => crearRol()}> Crear </Button>
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
              PERMISOS DEL ROL
          </CardHeader>
            <CardBody>
              <Row className="align-items-center">
                <Col lg="1" xl="1">
                  <label>Permiso</label>
                </Col>
                <Col lg="6" xl="6">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={selectOpciones}
                    onChange={(seleccion) => setPermisoAsignar(seleccion.value)}
                    name="permiso"
                  />
                </Col>
                <Col lg="4" xl="4">
                  <Button disabled={!valoresIniciales.id} size="sm" onClick={asignarPermiso}>Asignar Permiso</Button>
                </Col>
              </Row>
              <Row>
                <Table className="table">
                  <thead className="text-primary">
                    <tr>
                      <th className="header">Permiso</th>
                      <th className="header">Descripción</th>
                      <th className="header">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      permisosDelRol.length > 0 ?
                        permisosDelRol.map(dato =>
                          <tr key={dato.rol_permiso_id}>
                            <td> {dato.permiso_nombre} </td>
                            <td> {dato.permiso_descripcion} </td>
                            <td> <Button size="sm" onClick={deshabilitarPermiso(dato.rol_permiso_id)}>Eliminar</Button> </td>
                          </tr>) :
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
        eventoAceptar={eliminarRol}
        eventoCancelar={ocultarModal}
        titulo="Atención"
        cuerpo="¿Desea eliminar?" />
    </div>
  )
}