import React, { useEffect, useState } from "react";
import { Container, Col, Card, CardBody, Row, CardHeader, CardTitle, Table } from "reactstrap";
import { useSesion } from '../../context';
import BarraNavegacion from "../../components/Navbars/BarraNavegacion"
import { permisos as PERMISOSCONST } from '../../constantes/constantes'
import { proyectoTareaViewGetAllSelect } from "api/proyectoTarea";
import { tareaGetNOTIN, tareaEstadoViewGetAll } from "api/tarea";
import Chart from "../../components/Chart"
import { lineaBaseEstadoViewGetAll } from "api/lineaBase";
import { lineaBaseTareaCantidadViewGetAll } from "api/lineaBaseTarea";
import { usuarioRolCantidadViewGetAll } from "api/usuarioRol";
import { tareaGetAll } from "api/tarea";

export default function Inicio(props) {
  //variable global
  let sesion = useSesion();
  const permisosTiene = sesion.valoresSesion.permisos
  const [tareasAsignar, setTareasAsignar] = useState([])
  const [tareasEstados, setTareasEstados] = useState([])
  const [lineaBaseEstados, setLineaBaseEstados] = useState([])
  const [lineaBaseTareaCantidad, setLineaBaseTareaCantidad] = useState([])
  const [usuarioRolCantidad, setUsuarioRolCantidad] = useState([])
  const [cantidadTareas, setCantidadTareas] = useState([])

  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  useEffect(() => {
    if (tareasAsignar.length === 0) {
      buscarTareasAsignar()
    }
  }, [tareasAsignar])

  useEffect(() => {
    if (tareasEstados.length === 0) {
      buscarTareasEstados()
    }
  }, [tareasEstados])

  useEffect(() => {
    if (lineaBaseEstados.length === 0) {
      buscarLineaBaseEstados()
    }
  }, [lineaBaseEstados])

  useEffect(() => {
    if (lineaBaseTareaCantidad.length === 0) {
      buscarLineaBaseTareaCantidad()
    }
  }, [lineaBaseTareaCantidad])

  useEffect(() => {
    if (usuarioRolCantidad.length === 0) {
      buscarUsuarioRolCantidad()
    }
  }, [usuarioRolCantidad])

  useEffect(() => {
    if (cantidadTareas.length === 0) {
      buscarCantidadTareas()
    }
  }, [cantidadTareas])

  const buscarTareasAsignar = async () => {
    try {
      const tareasAsignadas = await proyectoTareaViewGetAllSelect("tarea_id")
      if (tareasAsignadas.length > 0) {
        var tareasId = tareasAsignadas.map(t => t.tarea_id);
        const respuesta = await tareaGetNOTIN(tareasId.join())
        setTareasAsignar(respuesta)
      } else {
        const respuesta = await tareaGetAll()
        setTareasAsignar(respuesta)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const buscarTareasEstados = async () => {
    const tareas = await tareaEstadoViewGetAll()
    var cantidad = tareas.map(t => t.count);
    var estado = tareas.map(t => t.estado);
    setTareasEstados([estado, cantidad])
  }

  const buscarLineaBaseEstados = async () => {
    const lineaBase = await lineaBaseEstadoViewGetAll()
    var cantidad = lineaBase.map(t => t.count);
    var estado = lineaBase.map(t => t.estado);
    setLineaBaseEstados([estado, cantidad])
  }

  const buscarLineaBaseTareaCantidad = async () => {
    const lineaBaseTarea = await lineaBaseTareaCantidadViewGetAll()
    var cantidad = lineaBaseTarea.map(t => t.count);
    var nombre = lineaBaseTarea.map(t => t.nombre);
    setLineaBaseTareaCantidad([nombre, cantidad])
  }

  const buscarUsuarioRolCantidad = async () => {
    const rolCantidad = await usuarioRolCantidadViewGetAll()
    var cantidad = rolCantidad.map(t => t.count);
    var nombre = rolCantidad.map(t => t.nombre);
    setUsuarioRolCantidad([nombre, cantidad])
  }

  const buscarCantidadTareas = async () => {
    const todasTareas = await tareaGetAll()
    const tareasAsignadas = await proyectoTareaViewGetAllSelect("tarea_id")
    var cantidad = [tareasAsignadas.length, todasTareas.length - tareasAsignadas.length];
    var nombre = ['asignadas', 'no asignadas'];
    setCantidadTareas([nombre, cantidad])
  }
  return (
    <>
      <div className="wrapper">
        <BarraNavegacion />
        <div className="page-header header-filter">
          <div className="header bg-gradient-info pb-8 pt-md">
            <Container fluid>
              {
                permisosTiene ?
                  <Row>
                    {
                      permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_ADMINISTRACION) ?
                        <Col lg="4" xl="4">
                          <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/administracion")}>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <span className="h2 font-weight-bold mb-0">
                                    Administración
                            </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                    <i className="fas fa-tasks"></i>
                                  </div>
                                </Col>
                              </Row>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                <span className="text-nowrap">Módulo que permite la administración de</span>
                                <span className="text-nowrap">usuarios y roles</span>
                              </p>
                            </CardBody>
                          </Card>
                        </Col> :
                        null
                    }
                    {
                      permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_CONFIGURACION) ?
                        <Col lg="4" xl="4">
                          <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/configuracion")}>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <span className="h2 font-weight-bold mb-0">
                                    Configuración
                            </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                    <i className="fas fa-user-cog" />
                                  </div>
                                </Col>
                              </Row>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                <span className="text-nowrap"> Módulo que permite la generación de líneas</span>
                                <span className="text-nowrap"> bases</span>
                              </p>
                            </CardBody>
                          </Card>
                        </Col> :
                        null
                    }
                    {
                      permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_DESARROLLO) ?
                        <Col lg="4" xl="4">
                          <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/desarrollo")}>
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <span className="h2 font-weight-bold mb-0">
                                    Desarrollo
                            </span>
                                  <span></span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                                    <i className="fas fa-terminal"></i>
                                  </div>
                                </Col>
                              </Row>
                              <p className="mt-3 mb-0 text-muted text-sm">
                                <span className="text-nowrap">Módulo que administra todos los elementos</span>
                                <span className="text-nowrap">de los productos</span>
                              </p>
                            </CardBody>
                          </Card>
                        </Col> :
                        null
                    }
                  </Row> :
                  null
              }
              {
                permisosTiene ?
                  <>
                    {
                      permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_DESARROLLO) ?
                        <Row>
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardHeader>
                                <CardTitle>
                                  <span className="h4 font-weight-bold mb-0">
                                    Tareas no asignadas a proyectos
                          </span>
                                </CardTitle>
                              </CardHeader>
                              <CardBody>
                                <Table responsive>
                                  <thead className="text-primary">
                                    <tr>
                                      <th className="header">Tarea</th>
                                      <th className="header">Estado</th>
                                      <th className="header">Version</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      tareasAsignar.length > 0 ?
                                        tareasAsignar.map(dato =>
                                          <tr key={dato.id}>
                                            <td> {dato.descripcion} </td>
                                            <td> {dato.estado} </td>
                                            <td> {dato.version} </td>
                                          </tr>) :
                                        <tr>
                                          <td> No hay tareas sin asignar </td>
                                          <td />
                                          <td />
                                        </tr>
                                    }
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardBody>
                                <Chart line
                                  label={cantidadTareas[0]}
                                  datos={cantidadTareas[1]}
                                  titulo={"Cantidad Tareas según asignación"} />
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardBody>
                                <Chart doughnut
                                  label={tareasEstados[0]}
                                  datos={tareasEstados[1]}
                                  titulo={"Cantidad de Tareas según estados"} />
                              </CardBody>
                            </Card>
                          </Col>
                        </Row> :
                        null
                    }
                    <Row>
                      {
                        permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_CONFIGURACION) ?
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardBody>
                                <Chart bar
                                  label={lineaBaseEstados[0]}
                                  datos={lineaBaseEstados[1]}
                                  titulo={"Cantidad de Linea Base según estados"} />
                              </CardBody>
                            </Card>
                          </Col> :
                          null
                      }
                      {
                        permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_CONFIGURACION) ?
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardBody>
                                <Chart polar
                                  label={lineaBaseTareaCantidad[0]}
                                  datos={lineaBaseTareaCantidad[1]}
                                  titulo={"Cantidad de Tareas por Linea Base"} />
                              </CardBody>
                            </Card>
                          </Col> :
                          null
                      }
                      {
                        permisosTiene.find(permiso => permiso === PERMISOSCONST.VER_MENU_ADMINISTRACION) ?
                          <Col lg="4" xl="4">
                            <Card className="card-stats-table bg-white">
                              <CardBody>
                                <Chart radar
                                  label={usuarioRolCantidad[0]}
                                  datos={usuarioRolCantidad[1]}
                                  titulo={"Cantidad de Usuarios según Rol"} />
                              </CardBody>
                            </Card>
                          </Col> :
                          null
                      }
                    </Row>
                  </> :
                  null
              }
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
