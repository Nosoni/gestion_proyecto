import React, { useReducer } from "react";
import RolABM from "./RolABM";
import RolBuscador from "./RolBuscador";
import { createContext } from "react";

export const RolEstado = createContext(null);

export default function Rol(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarBuscardo: true,
    mostrarABM: false,
  });

  return (
    <React.Fragment>
      <RolEstado.Provider value={{ state, dispatch }}>
        {state.mostarBuscardo && <RolBuscador />}
        {state.mostrarABM && <RolABM />}
      </RolEstado.Provider>
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