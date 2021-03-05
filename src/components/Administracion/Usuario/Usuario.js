import React, { useEffect, useReducer } from "react";
import UsuarioABM from "./UsuarioABM";
import UsuarioBuscador from "./UsuarioBuscador";
import { createContext } from "react";

export const UsuarioEstado = createContext(null);

export default function Usuario(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {}
  });

  return (
    <React.Fragment>
      <UsuarioEstado.Provider value={{ state, dispatch }}>
        <UsuarioBuscador />
        <UsuarioABM />
      </UsuarioEstado.Provider>
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