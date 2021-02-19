import React from "react";
import { Container, Col, Card, CardBody, Row } from "reactstrap";

import BarraNavegacion from "../../components/Navbars/BarraNavegacion"

export default function Inicio(props) {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  return (
    <>
      <BarraNavegacion />
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="header bg-gradient-info pb-8 pt-md">
            <Container fluid>
              <div className="header-body">
                {/* Card stats */}
                <Row>
                  <Col lg="4" xl="4">
                    <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/usuarios")}>
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
                  </Col>
                  <Col lg="4" xl="4">
                    <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/404")}>
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
                          <span className="text-nowrap"> Módulo que permite la generación de líneas bases</span>
                          <span className="text-nowrap"> </span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4" xl="4">
                    <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => props.history.push("/404")}>
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
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <Container className="mt--7" fluid>
            <div className="content-center brand">
              <h1 className="h1-seo">BIENVENIDO</h1>
              <h3 className="d-none d-sm-block">
                Esta es la pantalla de inicio
              </h3>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
