import { server } from "../constantes/constantes"
import { lineaBaseGetByLB } from "./lineaBase"
const servicio = "linea_base_tarea";
const servicioView = "linea_base_tarea_view";
const servicioCantidadView = "linea_base_tareas_cantidad_view";

const lineaBaseTareaGetAllSelect = async (select) => {
  var where = `?select=${select}&activo=is.true`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
}

const lineaBaseTareaGetByTareaId = async (tarea_id) => {
  var where = `?and=(activo.is.true,tarea_id.eq.${tarea_id})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const lineaBaseTareaViewGet = async () => {
  var where = `?linea_base_activo=is.true`
  const url = `${server}/${servicioView}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const lineaBaseTareaAsignar = async (lineaBaseTarea) => {
  const lineaBase = await lineaBaseGetByLB(lineaBaseTarea.nombre)
  const tareas = lineaBaseTarea.tareas
  const add = tareas.map(t => {
    return { linea_base_id: lineaBase[0].id, tarea_id: t.tarea_id, activo: true }
  })
  const url = `${server}/${servicio}`;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(add)
  };
  return await fetch(url, requestOptions)
}

const lineaBaseTareaCantidadViewGetAll = async () => {
  const url = `${server}/${servicioCantidadView}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export {
  lineaBaseTareaViewGet, lineaBaseTareaAsignar, lineaBaseTareaGetByTareaId,
  lineaBaseTareaGetAllSelect, lineaBaseTareaCantidadViewGetAll
};
