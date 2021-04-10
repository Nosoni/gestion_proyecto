import { server } from "../constantes/constantes"
const servicio = "tarea";

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
  var where = `?id=eq.${datos.id}`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  };
  console.log(url)
  return []
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

export { tareaGetAll, tareaGetByDescripcion, tareaCrear, 
  tareaActualizar, tareaDeleteById, tareaGetById };