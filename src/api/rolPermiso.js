import { server } from "../constantes/constantes"
const servicio = "rol_permiso";
const servicioView = "rol_permiso_view";

const rolPermisoGetByRol = async (rol_id) => {
  var where = `?and=(activo.is.true,rol_id.eq.${rol_id})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};


const rolPermisoAsignar = async (usuarioRol) => {
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

const rolPermisoDeshabilitar = async (id) => {
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

const rolPermisoViewGetByRol = async (rol_id) => {
  var where = `?and=(rol_permiso_activo.is.true,rol_id.eq.${rol_id})`
  const url = `${server}/${servicioView}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export { rolPermisoGetByRol, rolPermisoAsignar, rolPermisoDeshabilitar, rolPermisoViewGetByRol };
