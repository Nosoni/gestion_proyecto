import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button,
  Table
} from 'reactstrap'
import { Accion, TareaEstado } from './Tarea';
import { tareaGetAll, tareaGetByDescripcion, tareaCrear, tareaActualizar, tareaDeleteById, tareaGetById } from '../../../api/tarea'
import Select from 'react-select';

export default function TareaABM() {
  const { state, dispatch } = useContext(TareaEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [tareaLocal, setTareaLocal] = useState({})
  const [selectOpciones, setSelectOpciones] = useState([])
  const [estadosOpciones, setEstadosOpciones] = useState([])
  const [tareaAsignar, setTareaAsignar] = useState()
  const [tareaPadre, setTareaPadre] = useState([])

  const buscarTareas = async () => {
    const respuesta = await tareaGetAll()
    let opciones = respuesta.map(dato => { return { value: dato.id, label: dato.descripcion } })
    setSelectOpciones(opciones)
  }

  const cargarEstados = async () => {
    setEstadosOpciones([{ value: "iniciado", label: "Iniciado" },
    { value: "pendiente", label: "Pendiente" }])
  }

  const buscarTareaPadre = async () => {
    if (valoresIniciales.id_tarea_padre) {
      const respuesta = await tareaGetById(valoresIniciales.id_tarea_padre)
      setTareaPadre(respuesta)
    }
  }

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  useEffect(() => {
    buscarTareas()
    cargarEstados()
    if (valoresIniciales.id) {
      buscarTareaPadre()
      setTareaLocal(valoresIniciales)
    }
  }, [valoresIniciales])

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const mostrarBuscador = () => dispatch({ type: Accion.MOSTRAR_BUSCADOR });

  const crearTarea = async () => {
    try {
      if (!tareaLocal.descripcion || tareaLocal.descripcion.length === 0) {
        throw new Error("sin datos");
      }
      if (!tareaLocal.estado || tareaLocal.estado.length === 0) {
        throw new Error("sin datos");
      }
      const cre = await tareaCrear(tareaLocal)
      const creado = await tareaGetByDescripcion(tareaLocal.descripcion)
      actualizarSelecion(creado[0])
      setTareaLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const editarTarea = async () => {
    try {
      if (!tareaLocal.descripcion || tareaLocal.descripcion.length === 0) {
        throw new Error("sin datos");
      }
      if (!tareaLocal.estado || tareaLocal.estado.length === 0) {
        throw new Error("sin datos");
      }
      await tareaActualizar({ ...tareaLocal, id: valoresIniciales.id })
    } catch (error) {
      console.log(error.message)
    }
  }

  const eliminarTarea = async () => {
    try {
      await tareaDeleteById(valoresIniciales.id)
      actualizarSelecion({})
      setTareaLocal({})
      setTareaPadre([])
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const cancelar = () => {
    actualizarSelecion({})
    mostrarBuscador()
  }

  const asignarTareaPadre = async () => {
    try {
      await tareaActualizar({ id: valoresIniciales.id, id_tarea_padre: tareaAsignar })
      buscarTareaPadre();
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const deshabilitarTareaPadre = (id) => e => {
    deshabilitar(id)
  }

  const deshabilitar = async (id) => {
    try {
      await tareaActualizar({ id, id_tarea_padre: null })
      buscarTareaPadre();
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
              FORMULARIO TAREA
          </CardHeader>
            <CardBody>
              <Form>
                <Row className="justify-content-center">
                  <Col md="6">
                    <FormGroup>
                      <label >Descripción</label>
                      <Input
                        defaultValue={valoresIniciales.descripcion}
                        placeholder="Ingrese descripción"
                        type="text"
                        onChange={(evento) => { setTareaLocal({ ...tareaLocal, descripcion: evento.target.value }) }} />
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="6">
                    <FormGroup>
                      <label >Estado</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        onChange={(seleccion) => setTareaLocal({ ...tareaLocal, estado: seleccion.value })}
                        options={estadosOpciones}
                        name="estado"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  {
                    valoresIniciales.id ?
                      <>
                        <Button size="sm" onClick={() => editarTarea()}> Editar </Button>
                        <Button className="btn-danger" size="sm" onClick={() => eliminarTarea()}> Eliminar </Button>
                      </> :
                      <Button size="sm" onClick={() => crearTarea()}> Crear </Button>
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
              TAREA PADRE
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
                  />
                </Col>
                <Col lg="4" xl="4">
                  <Button size="sm" onClick={asignarTareaPadre}>Asignar tarea</Button>
                </Col>
              </Row>
              <Row>
                <Table className="table">
                  <thead className="text-primary">
                    <tr>
                      <th className="header">Descripción</th>
                      <th className="header">Estado</th>
                      <th className="header">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tareaPadre.length > 0 ?
                        tareaPadre.map(dato =>
                          <tr key={dato.id}>
                            <td> {dato.descripcion} </td>
                            <td> {dato.estado} </td>
                            <td> <Button size="sm" onClick={deshabilitarTareaPadre(dato.id)}>Eliminar</Button> </td>
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
    </div>

  )
}