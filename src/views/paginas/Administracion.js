import React from "react";
import AdminNav from "../../components/Administracion/AdminNav"
import { Route, Switch, Redirect } from "react-router-dom";
import Usuario from "../../components/Administracion/Usuario/Usuario";
import Rol from "../../components/Administracion/Rol/Rol";

export default function Inicio(props) {

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/administracion") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <AdminNav routes={routes} />
        <div className="page-header header-filter">
          <div className="header bg-gradient-info pb-8 pt-md">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/administracion/usuario" />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

var routes = [
  {
    path: "/usuario",
    name: "Usuario",
    icon: "ni ni-planet text-blue",
    component: Usuario,
    layout: "/administracion",
  },
  {
    path: "/rol",
    name: "Rol",
    icon: "ni ni-pin-3 text-orange",
    component: Rol,
    layout: "/administracion",
  },
];