import { server } from "../constantes/constantes"
const servicio = "usuario";

const getUsuario = async filter => {
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

export { getUsuario };