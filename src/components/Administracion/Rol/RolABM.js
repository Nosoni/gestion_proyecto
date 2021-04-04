import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table
} from 'reactstrap'
import { Accion, RolEstado } from './Rol';
import { rolCrear, rolDeleteById, rolActualizar, rolGetByRol } from '../../../api/rol'
import Select from 'react-select';
import { permisoGetAll } from '../../../api/permiso';
import { rolPermisoAsignar, rolPermisoDeshabilitar, rolPermisoViewGetByRol } from '../../../api/rolPermiso';

export default function RolABM() {
  const { state, dispatch } = useContext(RolEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [rolLocal, setRolLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [permisoAsingnar, setPermisoAsignar] = useState()
  const [permisosDelRol, setPermisosDelRol] = useState([])

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

  const crearRol = async () => {
    try {
      if (!rolLocal.nombre || rolLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await rolCrear(rolLocal)
      const actualizado = await rolGetByRol(rolLocal.nombre)
      actualizarSelecion(actualizado[0])
      setRolLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const editarRol = async () => {
    try {
      if (!rolLocal.nombre || rolLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await rolActualizar({ ...rolLocal, id: valoresIniciales.id })
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const eliminarRol = async () => {
    try {
      await rolDeleteById(valoresIniciales.id)
      actualizarSelecion({})
      setRolLocal({})
      setPermisosDelRol([])
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const asignarPermiso = async () => {
    try {
      await rolPermisoAsignar({ rol_id: valoresIniciales.id, permiso_id: permisoAsingnar })
      buscarPermisoRol();
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const deshabilitarPermiso = (id) => e => {
    deshabilitar(id)
  }

  const deshabilitar = async (id) => {
    try {
      const respuesta = await rolPermisoDeshabilitar(id)
      buscarPermisoRol();
    } catch (error) {
      console.log("ocurrio un error")
    }
  }
  
  return (
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
                      <Button className="btn-danger" size="sm" onClick={() => eliminarRol()}> Eliminar </Button>
                    </> :
                    <Button size="sm" onClick={() => crearRol()}> Crear </Button>
                }
                <Button className="btn-warning" size="sm" onClick={() => actualizarSelecion({})}> Cancelar </Button>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
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
                <Button size="sm" onClick={asignarPermiso}>Asignar Permiso</Button>
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
  )
}