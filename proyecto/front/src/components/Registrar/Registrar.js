import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../css/estilos.css';
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
    sexo: ''

  });
  const [id, setId, idRef] = useState("")
  const [cadena, setCadena, cadenaRef] = useState("")
  const [errorNoEmp, setErrorNoEmp, errorNoEmpRef] = useState(false)
  const [errorNombre, setErrorNombre, errorNombreRef] = useState(false)
  const [errorPaterno, setErrorPaterno, errorPaternoRef] = useState(false)
  const [errorMaterno, setErrorMaterno, errorMaternoRef] = useState(false)
  const [errorEscuela, setErrorEscuela, errorEscuelaRef] = useState(false)
  const [errorMunicipio, setErrorMunicipio, errorMunicipioRef] = useState(false)
  const [errorSexo, setErrorSexo, errorSexoRef] = useState(false)
  const [errorNivel, setErrorNivel, errorNivelRef] = useState(false)
  const [errorActivoJubilado, setErrorActivoJubilado, errorActivoJubiladoRef] = useState(false)
  const [errorRegion, setErrorRegion, errorRegionRef] = useState(false)
  const [errorTelefono, setErrorTelefono, errorTelefonoRef] = useState(false)

  useEffect(() => { console.log("errorNoEmp data changed") }, [errorNoEmp])

  useEffect(() => {
    api.buscarTelefono("000")
      .then(respuesta => {
        console.log("ARRANCAR-API")
      })

    api.buscarPass(localStorage.getItem('user'))
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          setId(respuesta.data.id)
          setCadena(respuesta.data.cadena)
          // console.log(respuesta.data)
          // localStorage.setItem('user',respuesta.data.password)
          console.log("CORRECTO")
        } else {
          window.location.href = '/'
        }
        console.log(respuesta);
      })
    setErrorNoEmp(false)
    setErrorNombre(false)
    setErrorPaterno(false)
    setErrorMaterno(false)
    setErrorEscuela(false)
    setErrorRegion(false)
    setErrorTelefono(false)
    setErrorMunicipio(false)
    setErrorNivel(false)
    setErrorActivoJubilado(false)
    setErrorSexo(false)
  },[]);



  const revisa = async function revisarFormulario(data) {
    // var problemas=false;
    setErrorNoEmp(false)
    setErrorNombre(false)
    setErrorPaterno(false)
    setErrorMaterno(false)
    setErrorEscuela(false)
    setErrorRegion(false)
    setErrorTelefono(false)
    setErrorNivel(false)
    setErrorMunicipio(false)
    setErrorActivoJubilado(false)
    setErrorSexo(false)
    if (data.no_emp === undefined || data.no_emp.trim() === '') {
      setErrorNoEmp(true)
      // problemas=true;
    }
    if (data.nombre === undefined || data.nombre.trim() === '') {
      setErrorNombre(true)
      // problemas=true;
    }
    if (data.ap_paterno === undefined || data.ap_paterno.trim() === '') {
      setErrorPaterno(true)
      // problemas=true;
    }
    if (data.ap_materno === undefined || data.ap_materno.trim() === '') {
      setErrorMaterno(true)
      // problemas=true;
    }
    if (data.escuela === undefined || data.escuela.trim() === '') {
      setErrorEscuela(true)
      // problemas=true;
    }
    if (data.region === undefined || data.region.trim() === '') {
      setErrorRegion(true)
      // problemas=true;
    }
    if (data.telefono === undefined || data.telefono.trim() === '') {
      setErrorTelefono(true)
      // problemas=true;
    }
    if (data.nivel === undefined || data.nivel.trim() === '') {
      setErrorNivel(true)
      // problemas=true;
    }
    if (data.municipio === undefined || data.municipio.trim() === '') {
      setErrorMunicipio(true)
      // problemas=true;
    }
    if (data.activojubilado === undefined || data.activojubilado.trim() === '') {
      setErrorActivoJubilado(true)
      // problemas=true;
    }
    if (data.sexo === undefined || data.sexo.trim() === '') {
      setErrorSexo(true)
      // problemas=true;
    }

    if (errorMunicipioRef.current ||errorNoEmpRef.current || errorNombreRef.current || errorPaternoRef.current || errorMaternoRef.current || errorEscuelaRef.current || errorSexoRef.current || errorNivelRef.current || errorActivoJubiladoRef.current || errorRegionRef.current || errorTelefonoRef.current) {
      console.log("ERROR")
      alert("Faltan Campos(En Rojo)")
    } else {
      console.log("NO ERROR")
      enviarFormulario(data)
      // alert("TODO CORRECTO")
    }
    // console.log("ENVIADO")



  }

  function enviarFormulario(data) {
    api.buscarTelefono(data.telefono)
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          // localStorage.setItem('user',respuesta.data.password)
          alert("Telefono ya registrado con otro usuario")
        } else {
          api.buscarNoEmpleado(data.no_emp)
            .then(respuesta2 => {
              if (respuesta2.data.status === "EXITO") {
                // localStorage.setItem('user',respuesta.data.password)
                alert("No Empleado ya registrado")
              } else {
                console.log("CORRECTO")
                registrar(data)
                // window.location.href = '/'
              }
              // console.log(respuesta);
            })
        }
        // console.log(respuesta);
      })


  }

  function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


  function registrar(data) {
    let contra= randomString(10)

    // console.log(data)
   
    api.registrar({
      nombre: data.nombre,
      ap_paterno: data.ap_paterno,
      ap_materno: data.ap_materno,
      no_emp: data.no_emp,
      sexo: data.sexo,
      municipio: data.municipio,
      escuela: data.escuela,
      region: data.region,
      telefono: data.telefono,
      activojubilado: data.activojubilado,
      nivel: data.nivel,
      foto: "http://",
      referido: idRef.current,
      password: contra,
      agregados: 0,
      verificado: 0,
      cadena: cadenaRef.current+idRef.current+'-'
    }).then(respuesta => {

      api.sumar(idRef.current)
      if(respuesta.data.status==="EXITO"){
        alert("USUARIO AGREGADO CORRECTAMENTE")
        window.location.reload();

      } else
      alert("#EMPLEADO O TELEFONO YA CAPTURADO REVISAR INFORMACION")
    })

    api.hijos(idRef.current).then(respuesta => {
      console.log(respuesta.data)
    })

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
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => revisa(data))}>

          <TextField
            error={errorNombre}
            // helperText="Introducir Nombre"
            size="small"
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
            error={errorPaterno}
            // helperText="Introducir Apellido Paterno"
            size="small"
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
            error={errorMaterno}
            // helperText="Introducir Apellido Materno"
            size="small"
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
            error={errorNoEmp}
            // helperText="Introducir Número de Empleado"
            size="small"
            variant="outlined"
            margin="normal"
            {...register('no_emp')}
            required
            fullWidth
            id="no_emp"
            label="# de Empleado"
            name="no_emp"
            type="text"
          // autoComplete="email"
          // autoFocus
          />

          <FormControl fullWidth>
            <InputLabel style={{ marginTop: "0px" }} htmlFor="outlined-age-native-simple">Sexo</InputLabel>
            <Select
              error={errorSexo}

              style={{ marginTop: "15px" }}
              {...register('sexo')}
              native
              // fullWidth
              value={state.sexo}
              onChange={handleChange}
              label="sexo"
              inputProps={{
                name: 'sexo',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Masculino"}>Masculino</option>
              <option value={"Femenino"}>Femenino</option>
            </Select>
          </FormControl>
          <FormControl style={{ width: '50%' }}>
            <InputLabel style={{ marginTop: "0px" }} htmlFor="outlined-age-native-simple">Nivel</InputLabel>
            <Select
              error={errorNivel}
              // helperText="Introducir Nivel"
              style={{ marginTop: "15px", marginRight: "30px" }}
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
          <FormControl style={{ width: '50%' }}>
            <InputLabel style={{ marginTop: "0px" }} htmlFor="outlined-age-native-simple">Activo/Jubilado</InputLabel>
            <Select
              error={errorActivoJubilado}
              // helperText="Introducir Activo/Jubilado"
              style={{ marginTop: "15px" }}
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
              <optgroup>
                <option aria-label="None" value="" />
                <option value={"Activo"}>Activo</option>
                <option value={"Jubilado"}>Jubilado</option>
              </optgroup>
            </Select>
          </FormControl>
          <TextField
            error={errorEscuela}
            // helperText="Introducir Escuela"
            size="small"
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
            error={errorRegion}
            // helperText="Introducir Region"
            size="small"
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
            error={errorMunicipio}
            // helperText="Introducir Region"
            size="small"
            variant="outlined"
            margin="normal"
            {...register('municipio')}
            required
            fullWidth
            id="municipio"
            label="Municipio"
            name="municipio"
            type="text"
          // autoComplete="email"
          // autoFocus
          />
          <TextField
            error={errorTelefono}
            // helperText="Introducir Telefono"
            size="small"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>

        </form>






      </Container>


    </Container>
  );
}