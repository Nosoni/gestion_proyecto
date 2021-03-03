import { server } from "../constantes/constantes"
const servicio = "usuario_rol_proyecto";

//obtiene el registro por usuario y proyecto
const getByUsuarioProyecto = async (usuario_id, proyecto_id) => {
    var where = `?and=(activo.is.true,usuario_id.eq.${usuario_id},proyecto_id.eq.${proyecto_id})`
    const url = `${server}/${servicio}${where}`;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    return await fetch(url, requestOptions)
      .then(response => response.json())
  };

export { getByUsuarioProyecto };
