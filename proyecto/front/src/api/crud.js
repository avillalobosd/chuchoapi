import axios from "axios";
const API_URL='https://abecode.com/chuchoapi';

export default {
 
    // MUESTRA TODOS LOS REGISTRO 
    mostrar:function(){
        return axios.get(API_URL+ "/muestra")
    },
    // BUSCA SI HAY UN TELEFONO REGISTRADO
    buscarTelefono: function (id) {
        return axios.get(API_URL + "/TelefonoOne/" + id);

    },
    buscarPass: function (id) {
        return axios.get(API_URL + "/ClavePass/" + id);

    }
  };
