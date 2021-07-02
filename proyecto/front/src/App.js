// import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// import Ayuda from './components/Ayuda';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import Registrar from './components/Registrar/Registrar';
import Navbar from './components/Navbar/Navbar';
import Usuario from './components/Usuario/Usuario';
import Referidos from './components/Referidos/Referidos';
import Ingresar from './components/Ingresar/Ingresar';
import Llaves from './components/Llaves/Llaves';
import Ayuda from './components/Ayuda/Ayuda';
// import BottomBar from './components/BottomBar';
function App() {




  
  return (
    <Router>
        
      <Switch>
      {/* <Route path="/venta" exact component={Venta} />
        <Route path="/inventario" exact component={Inventario} />
        <Route path="/reportes" exact component={Reportes} />
        <Route path="/configuracion" exact component={Configuracion} />*/}
        <Route path="/"  exact component={Login} />
        <div>
        <Navbar/>
        <Route path="/registrar" exact component={Registrar} />
        <Route path="/info" exact component={Info} /> 
        <Route path="/usuario" exact component={Usuario} /> 
        <Route path="/referidos" exact component={Referidos} /> 
        <Route path="/llaves" exact component={Llaves} /> 
        <Route path="/ayuda" exact component={Ayuda} />
        <Route path="/ingresar/:cadena" exact component={Ingresar} />

        </div>
      </Switch> 

      {/* <BottomBar /> */}
     
    </Router>
    
  )
}

export default App;
