import React, { useState } from "react";
import RolABM from "./RolABM";
import RolBuscador from "./RolBuscador";

export default function Rol(props) {
  const [state, setState] = useState({
    seleccionado: -1
  });

  return (
    <>
      <RolBuscador />
      <RolABM />
    </>
  )
}