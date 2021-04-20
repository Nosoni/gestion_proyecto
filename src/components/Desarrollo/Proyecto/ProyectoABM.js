import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table
} from 'reactstrap'
import Select from 'react-select';
import { Accion, ProyectoEstado } from './Proyecto';
import { tareaGetAll } from '../../../api/tarea';
import { proyectoGetByProyecto, proyectoCrear, proyectoActualizar, proyectoDeleteById } from '../../../api/proyecto';
import { proyectoTareaViewGetByProyecto, proyectoTareaAsignar, proyectoTareaDeshabilitar } from '../../../api/proyectoTarea';

export default function ProyectoABM() {
  const { state, dispatch } = useContext(ProyectoEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [proyectoLocal, setProyectoLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [tareaAsignar, setPermisoAsignar] = useState()
  const [tareasDelProyecto, setTareasDelProyecto] = useState([])

  const buscarTareas = async () => {
    const respuesta = await tareaGetAll()
    console.log(respuesta)
    let opciones = respuesta.map(dato => { return { value: dato.id, label: dato.descripcion } })
    setSelectOpciones(opciones)
  }

  const buscarTareasDelProyecto = async () => {
    const respuesta = await proyectoTareaViewGetByProyecto(valoresIniciales.id)
    setTareasDelProyecto(respuesta)
  }

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  useEffect(() => {
    buscarTareas()
    if (valoresIniciales.id) {
      buscarTareasDelProyecto()
    }
  }, [valoresIniciales])

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarBuscador = () => dispatch({ type: Accion.MOSTRAR_BUSCADOR });

  const crearProyecto = async () => {
    try {
      if (!proyectoLocal.nombre || proyectoLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await proyectoCrear(proyectoLocal)
      const actualizado = await proyectoGetByProyecto(proyectoLocal.nombre)
      actualizarSelecion(actualizado[0])
      setProyectoLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const editarProyecto = async () => {
    try {
      if (!proyectoLocal.nombre || proyectoLocal.nombre.length === 0) {
        throw new Error("sin datos");
      }
      await proyectoActualizar({ ...proyectoLocal, id: valoresIniciales.id })
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const eliminarProyecto = async () => {
    try {
      await proyectoDeleteById(valoresIniciales.id)
      actualizarSelecion({})
      setProyectoLocal({})
      setTareasDelProyecto([])
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const cancelar = () => {
    actualizarSelecion({})
    mostrarBuscador()
  }

  const asignarTarea = async () => {
    try {
      await proyectoTareaAsignar({ proyecto_id: valoresIniciales.id, tarea_id: tareaAsignar })
      buscarTareasDelProyecto();
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const deshabilitarTarea = (id) => e => {
    deshabilitar(id)
  }

  const deshabilitar = async (id) => {
    try {
      await proyectoTareaDeshabilitar(id)
      buscarTareasDelProyecto();
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
              FORMULARIO PROYECTO
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
                        onChange={(evento) => { setProyectoLocal({ ...proyectoLocal, nombre: evento.target.value }) }} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label >Descripción</label>
                      <Input defaultValue={valoresIniciales.descripcion}
                        placeholder="Ingrese descripción"
                        type="text"
                        onChange={(evento) => { setProyectoLocal({ ...proyectoLocal, descripcion: evento.target.value }) }} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  {
                    valoresIniciales.id ?
                      <>
                        <Button size="sm" onClick={() => editarProyecto()}> Editar </Button>
                        <Button className="btn-danger" size="sm" onClick={() => eliminarProyecto()}> Eliminar </Button>
                      </> :
                      <Button size="sm" onClick={() => crearProyecto()}> Crear </Button>
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
              TAREAS DEL PROYECTO
          </CardHeader>
            <CardBody>
              <Row className="align-items-center">
                <Col lg="1" xl="1">
                  <label>Tarea</label>
                </Col>
                <Col lg="6" xl="6">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={selectOpciones}
                    onChange={(seleccion) => setPermisoAsignar(seleccion.value)}
                    name="tarea"
                  />
                </Col>
                <Col lg="4" xl="4">
                  <Button size="sm" onClick={asignarTarea}>Asignar Tarea</Button>
                </Col>
              </Row>
              <Row>
                <Table className="table">
                  <thead className="text-primary">
                    <tr>
                      <th className="header">Tarea</th>
                      <th className="header">Estado</th>
                      <th className="header">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tareasDelProyecto.length > 0 ?
                        tareasDelProyecto.map(dato =>
                          <tr key={dato.proyecto_tarea_id}>
                            <td> {dato.tarea_descripcion} </td>
                            <td> {dato.estado} </td>
                            <td> <Button size="sm" onClick={deshabilitarTarea(dato.proyecto_tarea_id)}>Eliminar</Button> </td>
                          </tr>) :
                        <>
                          <tr>
                            <td> Sin datos... </td>
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
    </div>
  )
}