import React, { useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Table as TableStrap,
  FormGroup, Label, Input, Button, Alert
} from 'reactstrap'
import {
  GroupingState,
  IntegratedGrouping,
  PagingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import Select from 'react-select';
import { lineaBaseCrear } from '../../../api/lineaBase';
import { lineaBaseTareaAsignar, lineaBaseTareaViewGet, lineaBaseTareaGetAllSelect } from '../../../api/lineaBaseTarea';
import { tareaGetAll, tareaGetNOTIN } from '../../../api/tarea';

export default function LineaBaseBuscador() {
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("")
  const [lineasBases, setLineasBases] = useState([])
  const [tareasAsignar, setTareasAsignar] = useState([])
  const [estadosOpciones, setEstadosOpciones] = useState([])
  const [lineaBaseLocal, setLineaBaseLocal] = useState({})

  const [columns] = useState([
    { name: 'linea_base_nombre', title: 'Linea Base' },
    { name: 'linea_base_estado', title: 'Linea Base estado' },
    { name: 'tarea_descripcion', title: 'Tarea' },
    { name: 'tarea_estado', title: 'T. estado' },
  ]);

  useEffect(() => {
    if (estadosOpciones.length === 0)
      cargarEstados()
  }, [estadosOpciones])

  useEffect(() => {
    error.length > 0 ? setShowError(true) : setShowError(false)
  }, [error])

  useEffect(() => {
    if (lineasBases.length === 0)
      buscarLineaBase()
  }, [lineasBases])

  useEffect(() => {
    if (tareasAsignar.length === 0)
      buscarTareasAsignar()
  }, [tareasAsignar])

  const cargarEstados = async () => {
    setEstadosOpciones([{ value: "iniciado", label: "Iniciado" },
    { value: "pendiente", label: "Pendiente" }])
  }

  const buscarLineaBase = async () => {
    const respuesta = await lineaBaseTareaViewGet();
    setLineasBases(respuesta)
  }

  const buscarTareasAsignar = async () => {
    try {
      const tareasAsignadas = await lineaBaseTareaGetAllSelect("tarea_id")
      if (tareasAsignadas.length > 0) {
        var tareasId = tareasAsignadas.map(t => t.tarea_id);
        const respuesta = await tareaGetNOTIN(tareasId.join())
        setTareasAsignar(respuesta)
      } else {
        const respuesta = await tareaGetAll()
        setTareasAsignar(respuesta)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const actualizar = id => e => {
    let tareasId = lineaBaseLocal.tareas ? lineaBaseLocal.tareas : [];
    if (e.target.checked) {
      tareasId.push({ tarea_id: id })
    }
    else {
      tareasId = tareasId.filter(t => t.tarea_id !== id)
    }
    setLineaBaseLocal({ ...lineaBaseLocal, tareas: tareasId })
  }

  const generarLineaBase = async () => {
    try {
      if (!lineaBaseLocal.nombre || lineaBaseLocal.nombre.length === 0) {
        throw new Error("Ingresar nombre de LB");
      }
      if (!lineaBaseLocal.tareas || lineaBaseLocal.tareas.length === 0) {
        throw new Error("Favor seleccionar tareas");
      }
      var lineaBase = { ...lineaBaseLocal }
      delete lineaBase.tareas
      await lineaBaseCrear(lineaBase)
      await lineaBaseTareaAsignar(lineaBaseLocal)
      buscarLineaBase()
      buscarTareasAsignar()
      setLineaBaseLocal({})
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="main">
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader>
              LINEAS BASES
            </CardHeader>
            <CardBody>
              <Grid
                rows={lineasBases}
                columns={columns}
              >
                <PagingState
                  defaultCurrentPage={0}
                  pageSize={4}
                />
                <GroupingState
                  grouping={[{ columnName: 'linea_base_nombre' }]}
                />
                <IntegratedGrouping />
                <Table />
                <TableGroupRow />
                <TableHeaderRow />
              </Grid>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="container-sm">
        <Alert color="danger" isOpen={showError} toggle={() => setError("")}>
          <span>
            {error}
          </span>
        </Alert>
      </div>
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              TAREAS PARA ASIGNAR
            </CardHeader>
            <Row className="align-items-center">
              <Col lg="2" xl="2">
                <label>Nombre Linea Base</label>
              </Col>
              <Col lg="6" xl="6">
                <Input
                  onChange={event => setLineaBaseLocal({ ...lineaBaseLocal, nombre: event.target.value })}
                  placeholder="Ingrese nombre de Linea Base" />
              </Col>
              <Col lg="4" xl="4">
                <Button size="sm" onClick={generarLineaBase}>Crear LN</Button>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg="2" xl="2">
                <label>Estado</label>
              </Col>
              <Col lg="6" xl="6">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={(seleccion) => setLineaBaseLocal({ ...lineaBaseLocal, estado: seleccion.value })}
                  options={estadosOpciones}
                  name="estado"
                />
              </Col>
            </Row>
            <CardBody>
              <Row className="align-items-center">
                <TableStrap className="table">
                  <thead className="text-primary">
                    <tr>
                      <th className="header"></th>
                      <th className="header">Tarea</th>
                      <th className="header">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tareasAsignar.length > 0 ?
                        tareasAsignar.map(dato =>
                          <tr key={dato.id}>
                            <td>
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" onChange={actualizar(dato.id)} />
                                  <span className="form-check-sign" />
                                </Label>
                              </FormGroup>
                            </td>
                            <td> {dato.descripcion} </td>
                            <td> {dato.estado} </td>
                          </tr>) :
                        <tr>
                          <td> Sin datos... </td>
                          <td />
                          <td />
                        </tr>
                    }
                  </tbody>
                </TableStrap>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}