import { server } from "../constantes/constantes"
const servicio = "usuario_rol";

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

export { usuarioRolGetByUsuario };
