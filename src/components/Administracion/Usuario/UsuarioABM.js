import React, { useContext, useEffect, useState } from 'react'
import {
  Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Input, Button
} from 'reactstrap'
import { Accion, UsuarioEstado } from './Usuario';
import { usuarioCrear, usuarioDeleteById, usuarioActualizar, usuarioGetByUsuario } from '../../../api/usuario'

export default function UsuarioABM() {
  const { state, dispatch } = useContext(UsuarioEstado);
  const [valoresIniciales, setValoresIniciales] = useState(state.seleccionado)
  const [usuarioLocal, setUsuarioLocal] = useState({})

  useEffect(() => {
    setValoresIniciales(state.seleccionado)
  }, [state])

  const actualizarSelecion = (payload) => dispatch({ type: Accion.SELECCIONADO, payload });
  const crearUsuario = async () => {
    try {
      if (!usuarioLocal.usuario || usuarioLocal.usuario.length === 0) {
        throw new Error("sin datos");
      }
      if (!usuarioLocal.password || usuarioLocal.usuario.password === 0) {
        throw new Error("sin datos");
      }
      await usuarioCrear(usuarioLocal)
      const actualizado = await usuarioGetByUsuario(usuarioLocal.usuario)
      actualizarSelecion(actualizado[0])
      setUsuarioLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const editarUsuario = async () => {
    try {
      if (!usuarioLocal.usuario || usuarioLocal.usuario.length === 0) {
        throw new Error("sin datos");
      }
      if (!usuarioLocal.password || usuarioLocal.usuario.password === 0) {
        throw new Error("sin datos");
      }
      await usuarioActualizar({ ...usuarioLocal, id: valoresIniciales.id })
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  const eliminarUsuario = async () => {
    try {
      await usuarioDeleteById(valoresIniciales.id)
      actualizarSelecion({})
      setUsuarioLocal({})
    } catch (error) {
      console.log("ocurrio un error")
    }
  }

  return (<div>
    <Row className="justify-content-center">
      <Col lg="6" xl="6">
        <Card className="card-user">
          <CardHeader className="card-header">
            FORMULARIO USUARIO
          </CardHeader>
          <CardBody>
            <Form>
              <Row className="justify-content-center">
                <Col md="6">
                  <FormGroup>
                    <label >Usuario</label>
                    <Input defaultValue={valoresIniciales.usuario}
                      placeholder="Ingrese usuario"
                      type="text"
                      onChange={(evento) => { setUsuarioLocal({ ...usuarioLocal, usuario: evento.target.value }) }} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label >Contraseña</label>
                    <Input placeholder="Ingrese contraseña"
                      type="password"
                      onChange={(evento) => { setUsuarioLocal({ ...usuarioLocal, password: evento.target.value }) }} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {
                  valoresIniciales.id ?
                    <>
                      <Button size="sm" onClick={() => editarUsuario()}> Editar </Button>
                      <Button className="btn-danger" size="sm" onClick={() => eliminarUsuario()}>
                        Eliminar
                      </Button>
                    </> :
                    <Button size="sm" onClick={() => crearUsuario()}> Crear </Button>
                }
                <Button className="btn-warning" size="sm" onClick={() => actualizarSelecion({})}> Cancelar </Button>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>)
}