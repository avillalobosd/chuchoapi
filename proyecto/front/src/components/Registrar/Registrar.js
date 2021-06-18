import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import AddIcon from '@material-ui/icons/Add';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../css/estilos.css';
// import aguila from './a2.png';
import { useForm } from 'react-hook-form';
import api from '../../api/crud'
import { FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    position: '-webkit-sticky',
    position: 'sticky',
    top: 0,
    bottom: 0,
    paddingTop: '5px',
    paddingBottom: '10px',
    zIndex: 5,
  },
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
  },
}));

export default function Info() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const [state, setState] = React.useState({
    nivel: '',
    activojubilado: '',

  });


  useEffect(() => {
    api.buscarTelefono("000")
      .then(respuesta => {
        console.log("ARRANCAR-API")
      })

    api.buscarPass(localStorage.getItem('user'))
      .then(respuesta => {
        if (respuesta.data.status == "EXITO") {
          // localStorage.setItem('user',respuesta.data.password)
          console.log("CORRECTO")
        } else {
          window.location.href = '/'
        }
        console.log(respuesta);
      })
  }, []);


  function enviarFormulario(data) {
    console.log("nombre:" + data.nombre)
    console.log("ap_paterno:" + data.ap_paterno)
    console.log("ap_materno:" + data.ap_materno)
    console.log("escuela:" + data.escuela)
    console.log("region:" + data.region)
    console.log("telefono:" + data.telefono)
    console.log("nivel:" + data.nivel)
    console.log("activojubilado:" + data.activojubilado)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <Container className="containerInfo">
      {/* <Container className={classes.root}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="Registrar" value="registrar" icon={<AddIcon />} />
          <BottomNavigationAction label="Referidos" value="referidos" icon={<MenuBookIcon />} />
          <BottomNavigationAction component={Link} to={'/Info'}label="Anuncios" value="anuncios" icon={<AnnouncementIcon />} />
          <BottomNavigationAction label="Usuario" value="usuario" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Container> */}

      <Container>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => enviarFormulario(data))}>

          <TextField
            variant="outlined"
            margin="normal"
            {...register('nombre')}
            required
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register('ap_paterno')}
            required
            fullWidth
            id="ap_paterno"
            label="Apellido Paterno"
            name="ap_paterno"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register('ap_materno')}
            required
            fullWidth
            id="ap_materno"
            label="Apellido Materno"
            name="ap_materno"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register('escuela')}
            required
            fullWidth
            id="escuela"
            label="Escuela"
            name="escuela"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            {...register('region')}
            required
            fullWidth
            id="region"
            label="Region"
            name="region"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
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
          // autoFocus
          />
          <FormControl>
          <InputLabel style={{marginTop:"10px"}}htmlFor="outlined-age-native-simple">Nivel</InputLabel>
          <Select
          style={{marginTop:"30px",marginRight:"30px"}}
            {...register('nivel')}
            native
            value={state.nivel}
            onChange={handleChange}
            label="Nivel"
            inputProps={{
              name: 'nivel',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={"Primaria"}>Primaria</option>
            <option value={"Secundaria"}>Secundaria</option>
          </Select>
          </FormControl>
          <FormControl>
          <InputLabel  style={{marginTop:"10px"}}htmlFor="outlined-age-native-simple">Activo/Jubilado</InputLabel>
          <Select
          style={{marginTop:"30px"}}
            {...register('activojubilado')}
            native
            value={state.activojubilado}
            onChange={handleChange}
            label="Activo/Jubilado"
            inputProps={{
              name: 'activojubilado',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={"Activo"}>Activo</option>
            <option value={"Jubilado"}>Jubilado</option>
          </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>

        </form>






      </Container>


    </Container>
  );
}