import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Navegacao from './Navegacao/index';
import Drop1 from './Componente1/Drop1';
import Drop2 from './Componente2/Drop2';
import './App.css';

export default function App() {
    return (
    <div className="App">
      <h1>Exemplo drag and drop</h1>
      <Router>
        <Navegacao />
        <Switch>
          <Route exact path="/drop1">
            <Drop1 />
          </Route>
          <Route exact path="/drop2">
            <Drop2 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

