import React, { useReducer } from "react";
import RolABM from "./RolABM";
import RolBuscador from "./RolBuscador";
import { createContext } from "react";

export const RolEstado = createContext(null);

export default function Rol(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {}
  });

  return (
    <React.Fragment>
      <RolEstado.Provider value={{ state, dispatch }}>
        <RolBuscador />
        <RolABM />
      </RolEstado.Provider>
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