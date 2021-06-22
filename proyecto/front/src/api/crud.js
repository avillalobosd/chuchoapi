/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = 'https://abecode.com/chuchoapi';

export default {

    // MUESTRA TODOS LOS REGISTRO 
    mostrar: function () {
        return axios.get(API_URL + "/muestra")
    },
    // BUSCA SI HAY UN TELEFONO REGISTRADO
    buscarTelefono: function (id) {
        return axios.get(API_URL + "/TelefonoOne/" + id);

    },
    buscarPass: function (id) {
        return axios.get(API_URL + "/ClavePass/" + id);

    },
    buscarNoEmpleado: function (id) {
        return axios.get(API_URL + "/NoEmpleado/" + id);

    },

    registrar: function (datos) {
        return axios.put(API_URL + "/registrar", datos)
    },
    // ACTUALIZA INDICANDO QUE YA CUENTA CON HIJOS 
    hijos: function (id) {
        return axios.get(API_URL + "/hijos/" + id);

    },
    // ACTUALIZA INDICANDO QUE YA CUENTA CON HIJOS 
    muestraHijos: function (id) {
        return axios.get(API_URL + "/muestraHijos/" + id);

    },
    sumar: function (id) {
        return axios.get(API_URL + "/suma/" + id);

    }
};
