import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import ParserPage from './pages/ParserPage';
import './App.scss';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            render={(props) => <ParserPage {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
