import React, { useReducer } from "react";
import ProyectoABM from "./ProyectoABM";
import ProyectoBuscador from "./ProyectoBuscador";
import { createContext } from "react";

export const ProyectoEstado = createContext(null);

export default function Proyecto(props) {

  const [state, dispatch] = useReducer(reducer, {
    seleccionado: {},
    mostarBuscardo: true,
    mostrarABM: false,
  });

  return (
    <React.Fragment>
      <ProyectoEstado.Provider value={{ state, dispatch }}>
        {state.mostarBuscardo && <ProyectoBuscador />}
        {state.mostrarABM && <ProyectoABM />}
      </ProyectoEstado.Provider>
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