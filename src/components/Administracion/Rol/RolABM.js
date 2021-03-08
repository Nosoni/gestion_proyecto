import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table
} from 'reactstrap'
import { Accion, RolEstado } from './Rol';
import { rolCrear, rolDeleteById, rolActualizar, rolGetByRol } from '../../../api/rol'
import Select from 'react-select';
import { permisoGetAll } from '../../../api/permiso';
import { rolPermisoViewGetByRol } from '../../../api/rolPermiso';


export default function RolABM() {
  const { state, dispatch } = useContext(RolEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [rolLocal, setRolLocal] = useState({})
  const [permisoOpciones, setPermisoOpciones] = useState([])
  const [permisoAsingnar, setPermisoAsignar] = useState()
  const [permisoRol, setPermisoRol] = useState([])

  const buscarPermiso = async () => {
    const respuesta = await permisoGetAll()
    let opciones = respuesta.map(dato => { return { value: dato.id, label: dato.nombre } })
    setPermisoOpciones(opciones)
  }

  const buscarPermisoRol = async () => {
    console.log(valoresIniciales.id)
    // const respuesta = await rolPermisoViewGetByRol(valoresIniciales.id)
    // setPermisoRol(respuesta)
  }

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  useEffect(() => {
    if (valoresIniciales.id) {
      console.log("buscarPermiso")
      buscarPermisoRol()
    }
  }, [valoresIniciales])

  useEffect(() => {
    buscarPermiso()
  })

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
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  return (
    <div>
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
                    options={permisoOpciones}
                    onChange={(seleccion) => setPermisoAsignar(seleccion.value)}
                    name="rol"
                  />
                </Col>
                <Col lg="3" xl="3">
                  <Button size="sm" onClick={() => { }}>Asignar Permiso</Button>
                </Col>
              </Row>
              <Row>
                <Table className="table">
                  <thead className="text-primary">
                    <tr>
                      <th className="header">Permiso</th>
                      <th className="header">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      permisoRol.map(dato => <tr key={dato}>
                        <td> {dato.nombre} </td>
                        <td> <Button size="sm" onClick={() => { }}>Eliminar`</Button> </td>
                      </tr>)
                    }
                  </tbody>
                </Table>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}