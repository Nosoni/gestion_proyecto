import React, { useReducer } from "react";
import ProyectoABM from "./ProyectoABM";
import ProyectoBuscador from "./ProyectoBuscador";
import { createContext } from "react";

export const ProyectoEstado = createContext(null);

export default function Proyecto(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {}
  });

  return (
    <React.Fragment>
      <ProyectoEstado.Provider value={{ state, dispatch }}>
        <ProyectoBuscador />
        <ProyectoABM />
      </ProyectoEstado.Provider>
    </React.Fragment >
  )
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Accion.SELECCIONADO:
      return { ...state, seleccionado: action.payload }
    default:
      return state
  }
}

export const Accion = {
  SELECCIONADO: "seleccionado",
};