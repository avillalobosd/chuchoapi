import React, { useEffect } from 'react';
import useState from 'react-usestateref'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import '../css/estilos.css';
import { useForm } from 'react-hook-form';
import api from '../../api/crud'
import { FormControl } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  },  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
    width: '100px', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  input: {
    display: "none"
  },
  fab:{
    // width: "50%",
    // margin: "auto",
    // display:"block",
    "margin-left": "auto",
   "margin-right":"auto"
  }
}));

export default function Registrar() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  let { slug } = useParams();
  console.log(slug)
  const classes = useStyles();
  const { register, handleSubmit } = useForm()
  const [state, setState] = React.useState({
    nivel: '',
    activojubilado: '',
    sexo: ''

  });
  const [id, setId, idRef] = useState("")
  const [fotoSubida, setFotoSubida, fotoSubidaRef] = useState("")
  const [cadena, setCadena, cadenaRef] = useState("")
  const [nombreArchivo, setNombreArchivo, nombreArchivoRef] = useState("")
  const [fotoEnviar, setfotoEnviar, fotoEnviarRef] = useState("")
  const [errorNoEmp, setErrorNoEmp, errorNoEmpRef] = useState(false)
  const [contra, setContra, contraRef] = useState(false)
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
  const [open, setOpen, openRef] = useState(false);
  const [openEmpleado, setOpenEmpleado, openEmpleadoRef] = useState(false);
  const [openTelefono, setOpenTelefono, OpenTelefonoRef] = useState(false);
  const [openCampos, setOpenCampos, openCamposRef] = useState(false);

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
  }, []);

  const handleCloseToggle = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

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

    if (errorMunicipioRef.current || errorNoEmpRef.current || errorNombreRef.current || errorPaternoRef.current || errorMaternoRef.current || errorEscuelaRef.current || errorSexoRef.current || errorNivelRef.current || errorActivoJubiladoRef.current || errorRegionRef.current || errorTelefonoRef.current) {
      console.log("ERROR")
      // alert("Faltan Campos(En Rojo)")
      setOpenCampos(true)
    } else {
      console.log("NO ERROR")
      enviarFormulario(data)
      // alert("TODO CORRECTO")
    }
    // console.log("ENVIADO")



  }

  function enviarFormulario(data) {
    setOpen(true)
    api.buscarTelefono(data.telefono)
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          // localStorage.setItem('user',respuesta.data.password)
          setOpen(false)
          setOpenTelefono(true)
          setErrorTelefono(true)
          // alert("Telefono ya registrado con otro usuario")
        } else {
          api.buscarNoEmpleado(data.no_emp)
            .then(respuesta2 => {
              if (respuesta2.data.status === "EXITO") {
                // localStorage.setItem('user',respuesta.data.password)
                // alert("No Empleado ya registrado")
                setOpen(false)
                setOpenEmpleado(true)
                setErrorNoEmp (true)
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
    charSet = charSet || '0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }


  function registrar(data) {
    let cadenaF = randomString(10)
    setNombreArchivo(cadenaF)
    let fotog = "https://api.pontechucho.com/public/uploads/id.jpg"
    const formData = new FormData();
    if (nombreArchivo === "") {
      console.log("NO HAY FOTO")
    } else {
      formData.append('file', fotoEnviarRef.current, cadenaF + ".jpg");
      fotog = "https://api.pontechucho.com/public/uploads/" + nombreArchivoRef.current + '.jpg'
      console.log(data.foto[0])
    }
    // e.preventDefault();




    api.subirFoto(formData).then(respuesta => {
      console.log(respuesta)
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
        foto: fotog,
        referido: idRef.current,
        password: nombreArchivoRef.current,
        agregados: 0,
        verificado: 0,
        cadena: cadenaRef.current + idRef.current + '-',
        imagen: ""
      }).then(respuesta2 => {

       
       
        if (respuesta2.data.status === "EXITO") {
          var arrayDeCadenas = cadenaRef.current.split("-")
          function removeItemFromArr ( arr, item ) {
            var i = arr.indexOf( item );
         
            if ( i !== -1 ) {
                arr.splice( i, 1 );
            }
        }
         
        removeItemFromArr( arrayDeCadenas, "" );
        removeItemFromArr( arrayDeCadenas, "0" );
        let nuevoVector=[]
          arrayDeCadenas.forEach((elemento) => {
          nuevoVector.push(Number(elemento))
        });
        console.log( nuevoVector );
          
          nuevoVector.push(idRef.current)
          console.log(nuevoVector)
          // var enviarSumatodos={sumar:nuevoVector}
          api.sumarTodos({sumar:nuevoVector}).then(data => {
            alert("USUARIO AGREGADO CORRECTAMENTE")
            setOpen(false)
            window.location.reload();
          })


        } else
          alert("#EMPLEADO O TELEFONO YA CAPTURADO REVISAR INFORMACION")
      })
    })
    api.hijos(idRef.current).then(respuesta => {
      console.log(respuesta.data)
    })

  }

  const fileHandler = event => {
    const { files } = event.target;
            setfotoEnviar(files[0])
            var src= URL.createObjectURL(files[0])
            var alt= files[0].name
            setNombreArchivo(files[0].name)
            console.log(src)
            console.log(alt)
            setFotoSubida(src)
  };

  // };
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };


  const handleCloseSnack = () => {
    setOpenTelefono(false);
    setOpenEmpleado(false);
    setOpenCampos(false);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }}
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
       <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
            // helperText="Introducir N??mero de Empleado"
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
          <FormControl style={{ width: '100%' }}>
            <InputLabel style={{ marginTop: "0px" }} htmlFor="outlined-age-native-simple">Municipio</InputLabel>
            <Select
              error={errorMunicipio}

              style={{ marginTop: "15px" }}
              {...register('municipio')}
              native
              fullWidth
              value={state.municipio}
              onChange={handleChange}
              label="municipio"
              inputProps={{
                name: 'municipio',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Abasolo"}>Abasolo</option>
              <option value={"Agualeguas"}>Agualeguas</option>
              <option value={"Los Aldamas"}>Los Aldamas</option>
              <option value={"Allende"}>Allende</option>
              <option value={"An??huac"}>An??huac</option>
              <option value={"Apodaca"}>Apodaca</option>
              <option value={"Aramberri"}>Aramberri</option>
              <option value={"Bustamante"}>Bustamante</option>
              <option value={"Cadereyta Jim??nez"}>Cadereyta Jim??nez</option>
              <option value={"Carmen"}>Carmen</option>
              <option value={"Cerralvo"}>Cerralvo</option>
              <option value={"Ci??nega de Flores"}>Ci??nega de Flores</option>
              <option value={"China"}>China</option>
              <option value={"Doctor Arroyo"}>Doctor Arroyo</option>
              <option value={"Doctor Coss"}>Doctor Coss</option>
              <option value={"Doctor Gonz??lez"}>Doctor Gonz??lez</option>
              <option value={"Galeana"}>Galeana</option>
              <option value={"Garc??a"}>Garc??a</option>
              <option value={"San Pedro Garza Garc??a"}>San Pedro Garza Garc??a</option>
              <option value={"General Bravo"}>General Bravo</option>
              <option value={"General Escobedo"}>General Escobedo</option>
              <option value={"General Ter??n"}>General Ter??n</option>
              <option value={"General Trevi??o"}>General Trevi??o</option>
              <option value={"General Zaragoza"}>General Zaragoza</option>
              <option value={"General Zuazua"}>General Zuazua</option>
              <option value={"Guadalupe"}>Guadalupe</option>
              <option value={"Los Herreras"}>Los Herreras</option>
              <option value={"Higueras"}>Higueras</option>
              <option value={"Hualahuises"}>Hualahuises</option>
              <option value={"Iturbide"}>Iturbide</option>
              <option value={"Ju??rez"}>Ju??rez</option>
              <option value={"Lampazos de Naranjo"}>Lampazos de Naranjo</option>
              <option value={"Linares"}>Linares</option>
              <option value={"Mar??n"}>Mar??n</option>
              <option value={"Melchor Ocampo"}>Melchor Ocampo</option>
              <option value={"Mier y Noriega"}>Mier y Noriega</option>
              <option value={"Mina"}>Mina</option>
              <option value={"Montemorelos"}>Montemorelos</option>
              <option value={"Monterrey"}>Monterrey</option>
              <option value={"Par??s"}>Par??s</option>
              <option value={"Pesquer??a"}>Pesquer??a</option>
              <option value={"Los Ramones"}>Los Ramones</option>
              <option value={"Rayones"}>Rayones</option>
              <option value={"Sabinas Hidalgo"}>Sabinas Hidalgo</option>
              <option value={"Salinas Victoria"}>Salinas Victoria</option>
              <option value={"San Nicol??s de los Garza"}>San Nicol??s de los Garza</option>
              <option value={"Hidalgo"}>Hidalgo</option>
              <option value={"Santa Catarina"}>Santa Catarina</option>
              <option value={"Santiago"}>Santiago</option>
              <option value={"Vallecillo"}>Vallecillo</option>
              <option value={"Villaldama"}>Villaldama</option>

            </Select>
          </FormControl>
          {/* <TextField
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
          /> */}
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
            label="N??mero de Tel??fono"
            name="telefono"
            type="text"
          // autoComplete="email"
          // autoFocus
          />

        <input
            type="file"
            {...register('foto')}
            name="foto"
            id="foto"
            label="foto"
            className={classes.input}
            accept="image/*"
            onChange={fileHandler}
          />
          <label htmlFor="foto">
            
            <Fab className={classes.fab}variant="extended" component="span">
              <AddPhotoAlternateIcon />Foto Credencial
            </Fab>
          </label>
          <br></br>
          {fotoSubida=="" ? <div></div> :  <img className={classes.aguila} alt="chucho" src={fotoSubida}></img>}
         

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

      <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openTelefono} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} severity="error">
          Tel??fono ya registrado en sistema
        </Alert>
      </Snackbar>

    </div>
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openEmpleado} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} severity="error">
          N??mero de Empleado ya registrado en sistema
        </Alert>
      </Snackbar>

    </div>
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openCampos} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} severity="error">
          Faltan Campos
        </Alert>
      </Snackbar>

    </div>


    </Container>
  );
}