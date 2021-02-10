import React from 'react'
import { Form, Card, Row, Col, FormGroup, Input, Button } from 'reactstrap'

export default function Login(props) {
  return (
    <div className="main">
      <Card className="card-register">
        <Form >
          <Row className="justify-content-center">
            <Col md="6">
              <FormGroup>
                <label>Usuario</label>
                <Input placeholder="Ingrese usuario" type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="6">
              <FormGroup>
                <label>Contraseña</label>
                <Input placeholder="contraseña" type="password" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button
              color="primary"
              type="button"
              onClick={()=> props.history.push("/inicio")}
            >
              Ingresar
            </Button>
          </Row>
        </Form>
      </Card>
    </div>)
}