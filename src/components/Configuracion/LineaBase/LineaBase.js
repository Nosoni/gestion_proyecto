import React, { useReducer } from "react";
 import LineaBaseBuscador from "./LineaBaseBuscador";
import { createContext } from "react";

export const LineBaseEstado = createContext(null);

export default function LineBase(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarBuscardo: true,
    mostrarABM: false,
  });

  return (
    <React.Fragment>
      <LineBaseEstado.Provider value={{ state, dispatch }}>
        {state.mostarBuscardo && <LineaBaseBuscador />}
      </LineBaseEstado.Provider>
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