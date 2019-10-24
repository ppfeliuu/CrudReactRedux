import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import store from './store';
import { Provider } from 'react-redux';

//Components
import Header from './components/Header';
import NuevoProducto from './components/NuevoProducto';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="contaniner">
          <Header />
          <Switch>
              <Route exact path='/' component={Productos} />
              <Route exact path='/productos/nuevo' component={NuevoProducto} />
              <Route exact path='/productos/editar/:id' component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
    
  );
}

export default App;

