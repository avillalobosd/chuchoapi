// import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// import Ayuda from './components/Ayuda';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import Registrar from './components/Registrar/Registrar';
import Navbar from './components/Navbar/Navbar';
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
        </div>
      </Switch> 

      {/* <BottomBar /> */}
     
    </Router>
    
  )
}

export default App;
