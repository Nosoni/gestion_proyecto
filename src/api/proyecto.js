import { server } from "../constantes/constantes"
const servicio = "proyecto";

const proyectoGetByProyecto = async (proyecto) => {
  var where = `?and=(activo.is.true,nombre.like.*${proyecto}*)`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const proyectoCrear = async (datos) => {
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

const proyectoActualizar = async (datos) => {
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

const proyectoDeleteById = async (id) => {
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

export { proyectoGetByProyecto, proyectoCrear, proyectoActualizar, proyectoDeleteById };