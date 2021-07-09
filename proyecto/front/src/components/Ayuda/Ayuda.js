import React, { useEffect } from 'react';
import useState from 'react-usestateref'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import { Player } from 'video-react';
import { Player, ControlBar } from 'video-react';
import video1 from './video.mp4';
import ReactPlayer from 'react-player'

import '../css/estilos.css';

import { Grid } from '@material-ui/core';
import api from '../../api/crud'
import aguila from './a2.png';

const useStyles = makeStyles((theme) => ({
  aguila: {
    width: '150px', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },button: {
    margin: theme.spacing(1),
  }
}));


export default function Ayuda() {
  const classes = useStyles();
  const [id, setId, idRef] = useState("")
  const [nombre, setNombre, nombreRef] = useState("")
  const [paterno, setPaterno, paternoRef] = useState("")
  const [materno, setMaterno, maternoRef] = useState("")
  const [telefono, setTelefono, telefonoRef] = useState("")


  useEffect(() => {
    api.buscarTelefono("000")
      .then(respuesta => {
        console.log("ARRANCAR-API")
      })

    api.buscarPass(localStorage.getItem('user'))
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          setId(respuesta.data.id)
          setNombre(respuesta.data.nombre)
          setPaterno(respuesta.data.ap_paterno)
          setMaterno(respuesta.data.ap_materno)

          setTelefono(respuesta.data.telefono)
          console.log(respuesta.data)
          // localStorage.setItem('user',respuesta.data.password)
          console.log("CORRECTO")
        } else {
          window.location.href = '/'
        }
        console.log(respuesta);
      })

  }, []);

function salir(e){
  e.preventDefault()
  localStorage.setItem('user','NO')
  window.location.href = '/'
  console.log("SALIR")
}

  return (
    <>
<ReactPlayer  width="100%" controls url={video1} ></ReactPlayer>
    </>
  );
}