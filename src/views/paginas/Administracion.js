import { getAllUsuario } from "api/usuario";
import React, { useEffect, useState } from "react";
import { Container, Col, Card, CardBody, Row } from "reactstrap";
import BarraNavegacion from "../../components/Navs/AdminNav"

export default function Inicio(props) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
  })

  return (
    <>
      <div className="wrapper">
        <BarraNavegacion />
        <div className="page-header header-filter">
          <div className="header bg-gradient-info pb-8 pt-md">
            <Container fluid>
              <div className="header-body">
                <Row>
                  <Col lg="3" xl="3">
                    <Card className="bg-white">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <span className="h2 font-weight-bold mb-0">
                              Usuarios
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-users-cog"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-nowrap">Permite agregar o editar usuarios</span>
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
