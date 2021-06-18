import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../css/estilos.css';
// import aguila from './a2.png';
import { useForm } from 'react-hook-form';
import api from '../../api/crud'


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
  const [value, setValue] = useState('anuncios');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  
      <Container className={classes.root}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction component={Link} to={'/Registrar'}label="Registrar" value="registrar" icon={<AddIcon />} />
          <BottomNavigationAction label="Referidos" value="referidos" icon={<MenuBookIcon />} />
          <BottomNavigationAction component={Link} to={'/Info'}label="Anuncios" value="anuncios" icon={<AnnouncementIcon />} />
          <BottomNavigationAction label="Usuario" value="usuario" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Container>

  );
}