import React, { useReducer } from "react";
import TareaABM from "./TareaABM";
import TareaBuscador from "./TareaBuscador";
import { createContext } from "react";

export const TareaEstado = createContext(null);

export default function Tarea(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {}
  });

  return (
    <React.Fragment>
      <TareaEstado.Provider value={{ state, dispatch }}>
        <TareaBuscador />
        <TareaABM />
      </TareaEstado.Provider>
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