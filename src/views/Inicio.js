import React from "react";
import { Container } from "reactstrap";

import IndexNavbar from "../components/Navbars/IndexNavbar"

export default function Inicio() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <Container>
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
