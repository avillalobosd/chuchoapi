import React, { useEffect } from 'react';
import useState from 'react-usestateref'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../css/estilos.css';

import { Grid } from '@material-ui/core';
import api from '../../api/crud'
import aguila from './a2.png';

const useStyles = makeStyles((theme) => ({
  aguila: {
    width: '150px', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  }, button: {
    margin: theme.spacing(1),
  }
}));



export default function Ingresar() {
  const classes = useStyles();
  const [id, setId, idRef] = useState("")
  const [nombre, setNombre, nombreRef] = useState("")
  const [paterno, setPaterno, paternoRef] = useState("")
  const [materno, setMaterno, maternoRef] = useState("")
  const [telefono, setTelefono, telefonoRef] = useState("")

  let { cadena } = useParams();
  console.log(cadena)

  useEffect(() => {

    api.buscarTelefono("000")
      .then(respuesta => {
        console.log("ARRANCAR-API")
      }).then(respuesta => {
        localStorage.setItem('user', cadena)
      }).then(respuesta => {
        api.buscarPass(localStorage.getItem('user'))
          .then(respuesta => {
            if (respuesta.data.status == "EXITO") {
              setId(respuesta.data.id)
              setNombre(respuesta.data.nombre)
              setPaterno(respuesta.data.ap_paterno)
              setMaterno(respuesta.data.ap_materno)
              // localStorage.setItem('user',respuesta.data.password)
              console.log("CORRECTO")
            } else {
              console.log("INCORRECTO")
            }
            console.log(respuesta);
          })
      })

  }, []);



  return (
    <>
      <Grid container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        // style={{ minWidth: '100vh' }}
        xs={12}
      >
        <img className={classes.aguila} alt="chucho" src={aguila}></img>

      </Grid>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        // style={{ minWidth: '100vh' }}
        xs={12}
      >



        {nombre === "" ? 
        <Typography component="div">
        <Box fontSize={20} letterSpacing={5} fontWeight="fontWeightBold" textAlign="center" m={1}>
            Conectando
            <br></br>
            <CircularProgress />
        </Box>
        
        </Typography> : 
          
        <Typography component="div">
        <Box fontSize={22} letterSpacing={5} fontWeight="fontWeightBold" textAlign="center" m={1}>
            Conexión Exitosa
        </Box>
        <br></br>
        <Box fontSize={20} letterSpacing={5} fontWeight="fontWeightBold" textAlign="center" m={1}>
            Bienvenido/a
        </Box>
        
        <Box fontSize={20} letterSpacing={5} fontWeight="fontWeightBold" textAlign="center" m={1}>
            {nombreRef.current} {paternoRef.current} {maternoRef.current}
        </Box>
            <br></br>
          </Typography>}
        <br></br>
        {/* <Button  onClick={e => {salir(e)  }} variant="contained" color="secondary" className={classes.button}> */}
        {/* Desconectarse */}
        {/* </Button> */}

        {/* <br></br> */}


      </Grid>
    </>
  );
}