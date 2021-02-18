import React from "react";
import { Container } from "reactstrap";


export default function NotFound() {
  return (
    <div className="wrapper">
      <div className="page-header header-filter">
        <Container className="mt--7" fluid>
          <div className="content-center brand">
            <h1 className="h1-seo">404 - NOT FOUND</h1>
            <h3 className="d-none d-sm-block">
              La página que desea ver no existe.
              </h3>
          </div>
        </Container>
      </div>
    </div>
  );
}
