import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse, DropdownToggle, DropdownMenu, DropdownItem,
  UncontrolledDropdown, NavbarBrand, Navbar, NavItem, NavLink, Nav,
  Container, Row, Col,
} from "reactstrap";
import { useSesion } from '../../context';

export default function BaraNavegacion() {
  let sesion = useSesion();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  
  const cerrarSeion = () => {
    sesion.actualizarValores({ type: "usuario", payload: "" })
    sesion.actualizarValores({ type: "permisos", payload: [] })
  }
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/inicio" tag={Link} id="navbar-brand">
            <span>INICIO</span>
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Menú
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://github.com/Nosoni/inge_dos"
                rel="noopener noreferrer"
                target="_blank"
                title="Github"
              >
                <i className="fab fa-github" />
                <p className="d-lg-none d-xl-none">Github</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://inge-software-dos.atlassian.net/jira/software/projects/INGE/boards/7"
                rel="noopener noreferrer"
                target="_blank"
                title="Jira"
              >
                <i className="fab fa-jira" />
                <p className="d-lg-none d-xl-none">Jira</p>
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cog d-lg-none d-xl-none" />
                Acciones
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem tag={Link} to="/login" onClick={() => cerrarSeion()}>
                  <i className="tim-icons icon-button-power" />
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
