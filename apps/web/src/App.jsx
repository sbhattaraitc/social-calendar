import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Status from './Status';

function App() {
  return (
    <Router>
      <nav style={{padding:12,background:'#fff'}}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/status">Status</Link>
      </nav>
      <Switch>
        <Route path="/status" exact>
          <Status />
        </Route>
        <Route path="/" exact>
          <h1 style={{padding:20}}>Hello from Web App!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
