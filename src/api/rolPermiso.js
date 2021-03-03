import { server } from "../constantes/constantes"
const servicio = "rol_permiso";
const servicioView = "rol_permiso_view";

//obtiene el registro por rol
const getByRol = async (rol_id) => {
  var where = `?and=(activo.is.true,rol_id.eq.${rol_id})`
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};


const getViewByRol = async (rol_id) => {
  var where = `?and=(rol_permiso_activo.is.true,rol_id.eq.${rol_id})`
  const url = `${server}/${servicioView}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export { getByRol, getViewByRol };
