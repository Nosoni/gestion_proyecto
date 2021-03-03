import { getAllUsuario } from "api/usuario";
import React, { useEffect, useState } from "react";
import { Container, Col, Card, CardBody, Row } from "reactstrap";
import generatePDF from "../../services/reportGenerator";

import BarraNavegacion from "../../components/Navbars/BarraNavegacion"

export default function Inicio(props) {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    buscarUsuario()
  })

  const buscarUsuario = async () => {
    const response = await getAllUsuario();
    setTickets(response[0])
  }

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
                    <Card className="card-stats pointer mb-4 mb-xl-0 bg-white" onClick={() => generatePDF(tickets)}>
                      <CardBody>
                        <Row>
                          <div className="col">
                            <span className="h2 font-weight-bold mb-0">
                              Listar Usuario
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-download"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">Descarga un informe de los usuarios activos</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
