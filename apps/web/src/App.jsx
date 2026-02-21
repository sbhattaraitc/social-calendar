import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h1>Hello from Web App!</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
