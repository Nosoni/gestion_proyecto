import React, { createContext, useContext, useEffect, useState } from "react";

export const context = createContext(null);

export function SesionContext({ children }) {
  const sesion = useProvideSesion();
  return (
    <context.Provider value={sesion}>
      {children}
    </context.Provider>
  );
}

function useProvideSesion() {
  const [valoresSesion, setValoresSesion] = useState(null);

  useEffect(() => {
    valoresSesion != null ? console.log(valoresSesion) : console.log("")
  }, [valoresSesion])

  const actualizarValores = (accion) => {
    switch (accion.type) {
      case "usuario":
        setValoresSesion({ ...valoresSesion, usuario: accion.payload });
        break;
      case "permisos":
        setValoresSesion({ ...valoresSesion, permisos: accion.payload });
        break;
      default:
        break;
    }
  };

  return {
    valoresSesion,
    actualizarValores,
  };
}

export function useSesion() {
  return useContext(context);
}