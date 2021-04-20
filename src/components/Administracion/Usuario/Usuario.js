import React, { useReducer } from "react";
import UsuarioABM from "./UsuarioABM";
import UsuarioBuscador from "./UsuarioBuscador";
import { createContext } from "react";

export const UsuarioEstado = createContext(null);

export default function Usuario(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarBuscardo: true,
    mostrarABM: false,
  });

  return (
    <React.Fragment>
      <UsuarioEstado.Provider value={{ state, dispatch }}>
        {state.mostarBuscardo && <UsuarioBuscador />}
        {state.mostrarABM && <UsuarioABM />}
      </UsuarioEstado.Provider>
    </React.Fragment >
  )
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Accion.SELECCIONADO:
      return { ...state, seleccionado: action.payload }
    case Accion.MOSTRAR_ABM:
      return { ...state, mostarBuscardo: false, mostrarABM: true }
    case Accion.MOSTRAR_BUSCADOR:
      return { ...state, mostarBuscardo: true, mostrarABM: false }
    default:
      return state
  }
}

export const Accion = {
  SELECCIONADO: "seleccionado",
  MOSTRAR_ABM: "mostrarABM",
  MOSTRAR_BUSCADOR: "mostrarBuscador",
};