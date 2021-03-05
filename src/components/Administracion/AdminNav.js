import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {
  Collapse, Navbar, Nav, NavbarBrand,
  NavItem, NavLink, Container,
} from "reactstrap";

export default function BaraNavegacion(props) {
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const { routes } = props;

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

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/inicio" tag={Link} id="navbar-brand">
            <span>INICIO</span>
          </NavbarBrand>
        </div>
        <Collapse
          className="justify-content-star"
          navbar
        >
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
