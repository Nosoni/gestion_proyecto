import { server } from "../constantes/constantes"
const servicio = "usuario";

const usuarioGetByUsuarioPass = async filter => {
  var where = "?and=(activo.is.true,and("
  for (const filtro in filter) {
    if (filter[filtro]) {
      where += `${filtro}.eq.${filter[filtro]},`
    }
  }
  where = where.slice(0, -1)
  where += "))"
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const usuarioGetAll = async () => {
  var where = "?activo=is.true"
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const usuarioGetByUsuario = async (usuario) => {
  var where = `?and=(activo.is.true,usuario.eq.${usuario})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const usuarioDeleteById = async (id) => {
  var where = `?id=eq.${id}`
  const url = `${server}/${servicio}${where}`;
  console.log(url)
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

const usuarioCrear = async (datos) => {
  const url = `${server}/${servicio}`;
  console.log(url)
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...datos, activo: true })
  };

  return await fetch(url, requestOptions)
};

export {
  usuarioGetByUsuarioPass, usuarioGetAll, usuarioGetByUsuario,
  usuarioCrear, usuarioDeleteById
};