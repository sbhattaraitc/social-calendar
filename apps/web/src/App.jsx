import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Board from './Board';
import Status from './Status';

function App() {
  return (
    <Router>
      <nav style={{padding:12,background:'#fff',borderBottom:'1px solid #dee2e6'}}>
        <Link to="/">Board</Link> {' | '}
        <Link to="/status">Status</Link>
      </nav>
      <Switch>
        <Route path="/status" exact>
          <Status />
        </Route>
        <Route path="/" exact>
          <Board />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
