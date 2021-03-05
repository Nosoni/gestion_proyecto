import { server } from "../constantes/constantes"
const servicio = "rol";

const rolGetAll = async () => {
  var where = "?activo=is.true"
  const url = `${server}/${servicio}${where}`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return await fetch(url, requestOptions)
    .then(response => response.json())
};

export { rolGetAll };