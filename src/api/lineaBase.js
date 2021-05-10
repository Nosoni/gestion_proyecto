import { server } from "../constantes/constantes"
const servicio = "linea_base";
const servicioEstadoView = "linea_base_estado_view"

const lineaBaseGetByLB = async (nombre) => {
  var where = `?and=(activo.is.true,nombre.eq.${nombre})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const lineaBaseCrear = async (lineaBase) => {
  const url = `${server}/${servicio}`;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...lineaBase, activo: true })
  };

  return await fetch(url, requestOptions)
};

const lineaBaseEstadoViewGetAll = async () => {
  const url = `${server}/${servicioEstadoView}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export { lineaBaseGetByLB, lineaBaseCrear, lineaBaseEstadoViewGetAll };
