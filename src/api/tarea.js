import { server } from "../constantes/constantes"
import { lineaBaseTareaGetByTareaId } from "./lineaBaseTarea";
const servicio = "tarea";
const servicioEstadoView = "tarea_estado_view";

const tareaGetAll = async () => {
  var where = "?activo=is.true"
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const tareaGetByDescripcion = async (descripcion) => {
  var where = `?and=(activo.is.true,descripcion.like.*${descripcion}*)`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const tareaGetById = async (tarea_id) => {
  var where = `?and=(activo.is.true,id.eq.${tarea_id})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const tareaCrear = async (datos) => {
  const url = `${server}/${servicio}`;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...datos, activo: true })
  };

  return await fetch(url, requestOptions)
};

const tareaActualizar = async (datos) => {
  const lineaBaseTarea = await lineaBaseTareaGetByTareaId(datos.id)
  if (lineaBaseTarea.length > 0) {
    throw new Error("Tarea no puede editarse. Está asignada a una LB.")
  }
  var where = `?id=eq.${datos.id}`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  };
  return await fetch(url, requestOptions)
};

const tareaDeleteById = async (id) => {
  var where = `?id=eq.${id}`
  const url = `${server}/${servicio}${where}`;
  const dato = JSON.stringify({ activo: false })
  var requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dato
  };

  return await fetch(url, requestOptions)
};

const tareaGetNOTIN = async (notIn) => {
  var where = `?and=(activo.is.true,id.not.in.(${notIn}))`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const tareaEstadoViewGetAll = async () => {
  const url = `${server}/${servicioEstadoView}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export {
  tareaGetAll, tareaGetByDescripcion, tareaCrear,
  tareaActualizar, tareaDeleteById, tareaGetById, tareaGetNOTIN,
  tareaEstadoViewGetAll
};