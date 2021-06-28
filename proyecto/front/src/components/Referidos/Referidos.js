import React, { useEffect } from 'react';
import useState from 'react-usestateref'

// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
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
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
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
      
        var root=usuarioRef.current
        root.referido=0
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
    console.log(tree[0]);
  //     var z=datos;
  //     console.log(z)
  //     var nodes = z,
  //     tree = function (data, root) {
  //         var r = [], o = {};
  //         data.forEach(function (a) {
  //             if (o[a.id] && o[a.id].children) {
  //                 a.children = o[a.id] && o[a.id].children;
  //             }
  //             o[a.id] = a;
  //             if (a.referido === root) {
  //                 r.push(a);
  //             } else {
  //                 o[a.referido] = o[a.referido] || {};
  //                 o[a.referido].children = o[a.referido].children || [];
  //                 o[a.referido].children.push(a);
  //             }
  //         });
  //         return r;
  //     }(nodes, 0);
  
  // console.log(tree);
  


    }


  }, []);



  const renderTree = (nodes) => (
    // console.log(arbolRef.current)
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.nombre+" "+nodes.ap_paterno+" "+nodes.ap_materno+" ("+nodes.agregados+")"}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );
  return (

    arbol ?
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['1']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(arbolRef.current)}
    </TreeView> : null
  );
}