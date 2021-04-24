import React from "react";
import AdminNav from "../../components/Administracion/AdminNav"
import { Route, Switch, Redirect } from "react-router-dom";
import LineaBase from "../../components/Configuracion/LineaBase/LineaBase";

export default function Configuracion(props) {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/configuracion") {
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
              <Redirect from="*" to="/configuracion/lineabase" />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

var routes = [
  {
    path: "/lineabase",
    name: "Linea Base",
    icon: "ni ni-planet text-blue",
    component: LineaBase,
    layout: "/configuracion",
  },
];