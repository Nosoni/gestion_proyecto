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

const usuarioRolAsignar = async () => {
  return []
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

export { usuarioRolGetByUsuario, usuarioRolAsignar, usuarioRolViewGetByUsuario };
