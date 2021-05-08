import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table, Alert
} from 'reactstrap'
import Select from 'react-select';
import { Accion, ProyectoEstado } from './Proyecto';
import { tareaGetAll } from '../../../api/tarea';
import { proyectoGetByProyecto, proyectoCrear, proyectoActualizar, proyectoDeleteById } from '../../../api/proyecto';
import { proyectoTareaViewGetByProyecto, proyectoTareaAsignar, proyectoTareaDeshabilitar } from '../../../api/proyectoTarea';
import ModalIS from '../../../components/Modal';

export default function ProyectoABM() {
  const { state, dispatch } = useContext(ProyectoEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [proyectoLocal, setProyectoLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [tareaAsignar, setTareaAsignar] = useState()
  const [tareasDelProyecto, setTareasDelProyecto] = useState([])
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

  const buscarTareas = async () => {
    const respuesta = await tareaGetAll()
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
        throw new Error("Ingresar nombre");
      }
      await proyectoCrear(proyectoLocal)
      setAlerta({ mensaje: "Creado con éxito", type: "success" })
      const creado = await proyectoGetByProyecto(proyectoLocal.nombre)
      actualizarSelecion(creado[0])
      setProyectoLocal({})
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const editarProyecto = async () => {
    try {
      if (!proyectoLocal.nombre || proyectoLocal.nombre.length === 0) {
        throw new Error("Ingrese nombre");
      }
      await proyectoActualizar({ ...proyectoLocal, id: valoresIniciales.id })
      setAlerta({ mensaje: "Actualizado con éxito", type: "info" })
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const seleccionarProyectoEliminar = () => {
    setShowModal(true)
  }

  const eliminarProyecto = async () => {
    try {
      await proyectoDeleteById(valoresIniciales.id)
      setShowModal(false)
      actualizarSelecion({})
      setProyectoLocal({})
      setTareasDelProyecto([])
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

  const asignarTarea = async () => {
    try {
      if (!tareaAsignar) {
        throw Error("Favor asignar una tarea")
      }
      await proyectoTareaAsignar({ proyecto_id: valoresIniciales.id, tarea_id: tareaAsignar })
      buscarTareasDelProyecto();
      setAlerta({ mensaje: "Asignado con éxito", type: "success" })
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  const deshabilitarTarea = (id) => e => {
    deshabilitar(id)
  }

  const deshabilitar = async (id) => {
    try {
      await proyectoTareaDeshabilitar(id)
      setAlerta({ mensaje: "Tarea eliminada con éxito", type: "info" })
      buscarTareasDelProyecto();
    } catch (error) {
      setAlerta({ mensaje: error.message, type: "danger" })
    }
  }

  return (
    <div className="main">
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
                        <Button className="btn-danger" size="sm" onClick={() => seleccionarProyectoEliminar()}> Eliminar </Button>
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
                    onChange={(seleccion) => setTareaAsignar(seleccion.value)}
                    name="tarea"
                    styles={customStyles}
                  />
                </Col>
                <Col lg="4" xl="4">
                  <Button size="sm" disabled={!valoresIniciales.id} onClick={asignarTarea}>Asignar Tarea</Button>
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
      <ModalIS
        mostrar={showModal}
        eventoAceptar={eliminarProyecto}
        eventoCancelar={ocultarModal}
        titulo="Atención"
        cuerpo="¿Desea eliminar?" />
    </div>
  )
}