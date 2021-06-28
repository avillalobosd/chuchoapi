import React, { useState, useEffect } from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../css/estilos.css';
import aguila from './a2.png';
import {useForm} from 'react-hook-form';
import api from '../../api/crud'
// import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // width:'50%',
    // alignItems:'center'
  },
  aguila: {
    width: '150px', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  }
}));

export default function Login() {
  // ESTILOS DE ARRIBA
  const classes = useStyles();
  // HOOK-FORM
  const {register, handleSubmit} = useForm()
  // ESTADOS
  const [usuario, setUsuario] = useState("ESTE ES");

  // SE EJECUTA AL INICIARSE LA PAGINA 
  useEffect(() => {
    api.buscarTelefono("000")
    .then(respuesta => {
    console.log("ARRANCAR-API")
    })

    api.buscarPass(localStorage.getItem('user'))
    .then(respuesta => {
      if(respuesta.data.status==="EXITO"){
        // localStorage.setItem('user',respuesta.data.password)
        window.location.href='#registrar'
      }else{
        localStorage.setItem('user','NO')
      }
        console.log(respuesta);
    })
  },[usuario]);


  function buscarTelefono(data){
    api.buscarTelefono(data.telefono)
    .then(respuesta => {
      if(respuesta.data.status=="EXITO"){
        localStorage.setItem('user',respuesta.data.password)
        window.location.href='#registrar'
      }else{
        alert("USIARIO NO EXISTE ")
      }
        console.log(respuesta);
    })

  }

  return (
    <Container className="container">
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
        <img alt="" className={classes.aguila}src={aguila}></img>

          <Typography component="h1" variant="h5">

          <Box fontSize={20} letterSpacing={5} fontWeight="fontWeightBold" textAlign="center" m={1}>
          Para ingresar dar click al link enviado durante su registro
            <br></br>
            {/* <CircularProgress /> */}
        </Box>
            
        </Typography>
          {/* <form className={classes.form} noValidate onSubmit={handleSubmit((data)=> buscarTelefono(data) )}>
            <TextField
              variant="outlined"
              margin="normal"
              {...register('telefono')}
              required
              fullWidth
              id="telefono"
              label="Número de Teléfono"
              name="telefono"
              type="text"
              // autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
          </Button>

          </form> */}
        </div>

      </Container>
    </Container>
  );
}