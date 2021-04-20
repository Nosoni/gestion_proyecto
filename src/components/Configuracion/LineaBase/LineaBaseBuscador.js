import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Table as TableStrap } from 'reactstrap'
import {
  GroupingState,
  IntegratedGrouping,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  PagingPanel
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { lineaBaseTareaViewGet } from '../../../api/lineaBase';

export default function LineaBaseBuscador() {
  const [resultado, setResultado] = useState([])

  useEffect(() => {
    if (resultado.length == 0)
      buscarLineaBase()
  }, [resultado])

  const buscarLineaBase = async () => {
    const respuesta = await lineaBaseTareaViewGet();
    setResultado(respuesta)
  }

  const [columns] = useState([
    { name: 'linea_base_nombre', title: 'Linea Base' },
    { name: 'linea_base_estado', title: 'Linea Base estado' },
    { name: 'tarea_descripcion', title: 'Tarea' },
    { name: 'tarea_estado', title: 'T. estado' },
  ]);

  return (
    <div>
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardBody>
              <Grid
                rows={resultado}
                columns={columns}
              >
                <PagingState
                  defaultCurrentPage={0}
                  pageSize={4}
                />
                <GroupingState
                  grouping={[{ columnName: 'linea_base_nombre' }]}
                />
                <IntegratedPaging />
                <IntegratedGrouping />
                <Table />
                <TableGroupRow />
                <TableHeaderRow />
                <PagingPanel />
              </Grid>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center" >
        <Col lg="6" xl="6">
          <Card className="card-user">
            <CardHeader className="card-header">
              LINEAS BASE
            </CardHeader>
            <CardBody>
              <TableStrap className="table">
                <thead className="text-primary">
                  <tr>
                    <th className="header">Linea Base</th>
                    <th className="header">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> Sin datos... </td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </TableStrap>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}