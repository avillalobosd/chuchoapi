import React, {useRef, useEffect } from 'react';
import useState from 'react-usestateref'

// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
// import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import CopyAllIcon from '@material-ui/icons/CopyAll';
// import CopyAllIcon from '@material-ui/icons/CopyAll';
// import TreeView from '@material-ui/lab/TreeView';
// import TreeItem from '@material-ui/lab/TreeItem';
// import Collapse from '@material-ui/core/Collapse';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import '../css/estilos.css';


import { Grid } from '@material-ui/core';
import api from '../../api/crud'


const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  }, button: {
    fontSize: 10
  }, table: {
    minWidth: '100%',
    disable: "true"
  }
});




export default function Referidos() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const textAreaRef = useRef(null);
  const classes = useStyles();
  // const [user, setUser, userRef]=useState("")
  const [id, setId, idRef] = useState("")
  const [usuario, setUsuario, usuarioRef] = useState("")
  const [cadena, setCadena, cadenaRef] = useState("")
  const [listaReferidos, setListaReferidos, listaReferidosRef] = useState("")
  const [tieneHijos, setTieneHijos, tieneHijosRef] = useState(false)
  const [arbol, setArbol, arbolRef] = useState()
  const [open, setOpen, openRef] = useState(false);
  const [persona, setPersona, personaRef] = useState("");
  const [openS, setSOpen, openSRef] = useState("");

  const handleClickOpen = (e,id,nombre,paterno,materno,password) => {
    e.preventDefault()
    console.log(id,nombre,paterno,materno,password)
    var persona={
      id:id,
      nombre:nombre+" "+paterno+" "+materno,
      password:password,
      link:"https://ingresar.pontechucho.com/?cadena="+password
    }
    setPersona(persona)
    setOpen(true);
  };

  const handleCloseSnack = () => {
    setSOpen(false);
  };

  const handleClick = () => {
    setSOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const enviarLink = () => {
    console.log("enviarLink")
  };


  const copiarLink = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setSOpen(true);
    // setCopySuccess('Copied!');
    
  };
  useEffect(() => {
    api.buscarTelefono("000")
      .then(respuesta => {
        // console.log("ARRANCAR-API")
      })

    api.buscarPass(localStorage.getItem('user'))
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          console.log(respuesta.data)
          // setUser(respuesta.data)
          setId(respuesta.data.id)
          setCadena(respuesta.data.cadena)
          setTieneHijos(respuesta.data.hijos)
          setUsuario(respuesta.data)
          // console.log(respuesta.data)
          // localStorage.setItem('user',respuesta.data.password)
          // console.log("CORRECTO")
        } else {
          window.location.href = '/'
        }
        // console.log(tieneHijosRef.current);
      }).then(respuesta => {
        if (tieneHijosRef.current) {
          api.referidos(idRef.current)
            .then(respuesta => {
              setListaReferidos(respuesta.data)
              console.log(listaReferidosRef.current)
              // crearRamas(respuesta.data)
            })
          // console.log(listaHijosRef.current)
        } else {
          // console.log("NO TIENE HIJOS")
          // crearRamas(idRef.current)
        }

      })

  }, []);

  return (

    <>



      <Grid container
        spacing={0}
        direction="row"
        alignItems="left"
        justify="left"
        // style={{ minWidth: '100vh' }}
        xs={12}
      >


        <Typography component="div">
          <Box lineHeight={1} fontSize={25} fontWeight="fontWeightBold" letterSpacing={1} textAlign="center" m={3}>
            Envia el Link de Acceso a tu referido
          </Box>
          {Array.isArray(listaReferidos) ? listaReferidos.map((person, index) => (


<Box key={index}lineHeight={1} fontSize={15} fontWeight="fontWeightBold" letterSpacing={1} textAlign="left" m={3}>

<Button size="small" variant="outlined" color="primary" name={person.id}onClick={(e)=>handleClickOpen(e,person.id,person.nombre,person.ap_paterno,person.ap_materno, person.password)}>
  <VisibilityIcon/>
</Button>
{' '+' '+person.nombre+" "+person.ap_paterno+" "+person.ap_materno}
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{persona.nombre}</DialogTitle>
  <DialogContent >
    <DialogContentText id="alert-dialog-description">
      <textarea readonly disable className={classes.table}ref={textAreaRef} >{persona.link}</textarea>
      
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={(e)=>copiarLink(e)} color="primary">
      {"Copiar-"} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
</svg>
    </Button>
    <Button href={"whatsapp://send?text="+persona.nombre + " Muchas Gracias por registrarte a la APP de PONTECHUCHO, TU ENLACE DE ACCESO: "+persona.link } onClick={enviarLink} color="primary">
      {"Enviar-"}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
</svg>
    </Button>
    <Button onClick={handleClose} color="primary" autoFocus>
      Cerrar
    </Button>
  </DialogActions>
</Dialog>
</Box>

          )) : null}

        </Typography>
      

      </Grid>



{/* SNACKBAR */}
<div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openS} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleClose} severity="success">
          Elemento Copiado!
        </Alert>
      </Snackbar>

    </div>


    </>

  );
}