// import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// import Ayuda from './components/Ayuda';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
// import BottomBar from './components/BottomBar';
function App() {
  return (
    <Router>

      <Switch>
      {/* <Route path="/venta" exact component={Venta} />
        <Route path="/inventario" exact component={Inventario} />
        <Route path="/reportes" exact component={Reportes} />
        <Route path="/configuracion" exact component={Configuracion} />
        <Route path="/test" exact component={Venta} />*/}
        <Route path="/info" exact component={Info} /> 
        <Route path="/"  component={Login} />
      </Switch> 

      {/* <BottomBar /> */}
     
    </Router>
    
  )
}

export default App;
