import { server } from "../constantes/constantes"
const servicio = "linea_base";
const servicioView = "linea_base_tarea_view";

const lineaBaseTareaViewGet = async () => {
  var where = `?and=(linea_base_tarea_activo.is.true)`
  const url = `${server}/${servicioView}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const lineaBaseTareaAsignar = async (lineaBaseTarea) => {
  //lineaBaseTarea map
  const url = `${server}/${servicio}`;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...lineaBaseTarea, activo: true })
  };

  return await fetch(url, requestOptions)
}

export { lineaBaseTareaViewGet, lineaBaseTareaAsignar };
