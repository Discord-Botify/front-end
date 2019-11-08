import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';



function App() {
  return (
      <Router>

          <Route exact path={'/'} render={props => (
              <React.Fragment>
                  <div className="App">
                      <header className="Welcome">
                          Welcome
                      </header>
                      <p className="Description">
                          This is the login page for the Discord App Botify, which lets you keep track of all your favorite artists.
                      </p>
                      <button className="SpotButton"
                              onClick="">
                          Sign Up With Spotify
                      </button>
                  </div>
              </React.Fragment>
          )}/>

      </Router>

  );
}

export default App;
