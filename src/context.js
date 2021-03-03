import React, { createContext, useContext, useState } from "react";

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
  const [valoresSesion, setValoresSesion] = useState({ pepito: "hola" });

  const actualizarValores = valores => {
    setValoresSesion({ ...valoresSesion, valores });
  };

  return {
    valoresSesion,
    actualizarValores,
  };
}

export function useSesion() {
  return useContext(context);
}