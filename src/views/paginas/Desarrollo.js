import React from "react";
import AdminNav from "../../components/Administracion/AdminNav"
import { Route, Switch, Redirect } from "react-router-dom";
import Proyecto from "../../components/Desarrollo/Proyecto/Proyecto";
import Tarea from "../../components/Desarrollo/Tarea/Tarea";

export default function Desarrollo(props) {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/desarrollo") {
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
              <Redirect from="*" to="/desarrollo/Proyecto" />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

var routes = [
  {
    path: "/proyecto",
    name: "Proyecto",
    icon: "ni ni-planet text-blue",
    component: Proyecto,
    layout: "/desarrollo",
  },
  {
    path: "/tarea",
    name: "Tarea",
    icon: "ni ni-pin-3 text-orange",
    component: Tarea,
    layout: "/desarrollo",
  },
];