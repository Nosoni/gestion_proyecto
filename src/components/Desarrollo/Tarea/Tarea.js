import React, { useReducer } from "react";
import TareaABM from "./TareaABM";
import TareaBuscador from "./TareaBuscador";
import { createContext } from "react";

export const TareaEstado = createContext(null);

export default function Tarea(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarBuscardo: true,
    mostrarABM: false,
  });

  return (
    <React.Fragment>
      <TareaEstado.Provider value={{ state, dispatch }}>
        {state.mostarBuscardo && <TareaBuscador />}
        {state.mostrarABM && <TareaABM />}
      </TareaEstado.Provider>
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