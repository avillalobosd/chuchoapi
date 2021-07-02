import React, { useEffect } from 'react';
import useState from 'react-usestateref'

// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import '../css/estilos.css';


import { Grid } from '@material-ui/core';
import api from '../../api/crud'
var arrayToTree = require('array-to-tree');
// import aguila from './a2.png';


let data = {
  id: '0',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 400,
  }, footer: {
    "margin-top": "calc(80% + 60px)",
    bottom: "0"
  }, imagen: {
    width: '100%', // Fix IE 11 issue.
    // height:'100px'
    // marginTop: theme.spacing(1),
  }
});




export default function Referidos() {



  const classes = useStyles();
  // const [user, setUser, userRef]=useState("")
  const [id, setId, idRef] = useState("")
  const [usuario, setUsuario, usuarioRef] = useState("")
  const [cadena, setCadena, cadenaRef] = useState("")
  const [listaHijos, setListaHijos, listaHijosRef] = useState(0)
  const [tieneHijos, setTieneHijos, tieneHijosRef] = useState(false)
  const [arbol, setArbol, arbolRef] = useState()
  const [mostrar, setMostrar, mostrarRef] = useState()

  useEffect(() => {
    api.buscarTelefono("000")
      .then(respuesta => {
        // console.log("ARRANCAR-API")
      })

    api.buscarPass(localStorage.getItem('user'))
      .then(respuesta => {
        if (respuesta.data.status === "EXITO") {
          // console.log(respuesta.data)
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
          api.muestraHijos(cadenaRef.current + idRef.current + '-')
            .then(respuesta => {
              setListaHijos(respuesta.data)
              crearRamas(respuesta.data)
            })
          // console.log(listaHijosRef.current)
        } else {
          // console.log("NO TIENE HIJOS")
          // crearRamas(idRef.current)
        }

      })

    function crearRamas(datos) {

      var root = usuarioRef.current
      root.referido = 0
      datos.push(root)

      var nodes = datos,
        tree = function (data, root) {
          var r = [], o = {};
          data.forEach(function (a) {
            if (o[a.id] && o[a.id].children) {
              a.children = o[a.id] && o[a.id].children;
            }
            o[a.id] = a;
            if (a.referido === root) {
              r.push(a);
            } else {
              o[a.referido] = o[a.referido] || {};
              o[a.referido].children = o[a.referido].children || [];
              o[a.referido].children.push(a);
            }
          });
          return r;
        }(nodes, 0);
      setArbol(tree[0])
      // console.log(tree[0]);

    }


  }, []);



  const renderTree = (nodes) => (
    // console.log(arbolRef.current)
    // "ok"
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.nombre + " " + nodes.ap_paterno + " " + nodes.ap_materno + " (" + nodes.agregados + ")"} onClick={(e) => handleClick(e, nodes.id)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );


  const handleClick = (e, id) => {
    e.preventDefault()
    // console.log(listaHijos)
    var a = listaHijos.find(x => x.id === id);
    console.log("OK")
    setMostrar(a)
    console.log(mostrarRef.current)

  };
  return (

    <Box height="100vw" container direction="row" justify="flex-start">
      <Box height="20vw" style={{ overflow: "auto", backgroundColor: 'gray.300' }}>
        {/* IMAGEN */}
        <Box
          // style={{ overflow: "auto" }}
          alignItems="center"
          justify="center"
          width="30%"
          bgcolor="gray.300"
          display="inline-block">
        
          {mostrar ? mostrar.foto=="http://" ? "" : <img className={classes.imagen} src={mostrar.foto}></img> :""}
        </Box>
        {/* DATOS */}
        <Box
        fontSize={13}
          width="70%"
          position="absolute"
          bgcolor="gray.300"
          display="inline-block">
          Nombre: {mostrar ? mostrar.nombre + " " + mostrar.ap_paterno + " " + mostrar.ap_materno : ""}
          <br></br>
          Escuela: {mostrar ? mostrar.escuela : ""}
          <br></br>
          Municipio: {mostrar ? mostrar.municipio : ""}
          <br></br>
          Telefono: {mostrar ? mostrar.telefono : ""}
        </Box>


      </Box>
      <Box width="100%" style={{ overflow: 'auto', backgroundColor: 'white' }}>
        {arbol ?
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['1']}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(arbolRef.current)}
          </TreeView>
          : null}

      </Box>


    </Box>

    //   <Box height="70vw" width="100%">
    //   <Box height="25%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
    //     Height 25%
    //   </Box>
    //   <Box height="50%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
    //     Height 50%
    //   </Box>
    //   <Box height="75%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
    //     Height 75%
    //   </Box>
    //   <Box height="100%" bgcolor="grey.300" mx={0.5} width={120} display="inline-block">
    //     Height 100%
    //   </Box>
    // </Box>

  );


}