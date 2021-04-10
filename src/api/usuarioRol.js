import { server } from "../constantes/constantes"
const servicio = "usuario_rol";
const servicioView = "usuario_rol_view";

const usuarioRolGetByUsuario = async (usuario_id) => {
  var where = `?and=(activo.is.true,usuario_id.eq.${usuario_id})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

const usuarioRolAsignar = async (usuarioRol) => {
  const url = `${server}/${servicio}`;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...usuarioRol, activo: true })
  };

  return await fetch(url, requestOptions)
}

const usuarioRolDeshabilitar = async (id) => {
  var where = `?id=eq.${id}`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ activo: false })
  };

  return await fetch(url, requestOptions)
}

const usuarioRolViewGetByUsuario = async (usuario_id) => {
  var where = `?and=(activo.is.true,usuario_id.eq.${usuario_id})`
  const url = `${server}/${servicioView}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
}

export { usuarioRolGetByUsuario, usuarioRolAsignar, usuarioRolDeshabilitar, usuarioRolViewGetByUsuario };
