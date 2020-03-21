import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import ParserPage from './pages/ParserPage';
import './App.scss';
import FtpTreePage from './pages/FtpTreePage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
        <Route
            path="/mapper"
            render={(props) => <ParserPage {...props} />}
          />
          <Route
            path="/ftp-mapper"
            render={(props) => <FtpTreePage {...props} />}
          />
          <Route
            path='/'
            render={(props) => <MainPage {...props}/>}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
