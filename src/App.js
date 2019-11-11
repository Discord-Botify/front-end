import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import FollowList from './components/FollowList';
import DiscordAuthRedirect from "./reRoute/DiscordAuthRedirect";
import './App.css';



class App extends Component{
  state = {
    follows: [
      {
        id: '1',
        artist: 'some dummy data'
      },
      {
        id: '2',
        artist: 'more dummy data'
      },
    ]
  }
  unfollow = (id) => {
    this.setState({follows: [...this.state.follows.filter(follow => follow.id !== id)]});
    }
  render() {
    return (
      <Router>

          {/* Sign up page */}
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
                      <a
                          className={'btn btn-primary'}
                          href={'https://discordapp.com/api/oauth2/authorize?client_id=641722480511156235&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Foauth&response_type=code&scope=identify'}>
                          Sign in with Discord
                      </a>
                  </div>
                  
              </React.Fragment>
          )}/>
           <Route exact path={'/home'} render={props => (
              <React.Fragment>
                  <div className="App">
                      <header className="Welcome">
                          Home
                      </header>
                      <p className="Description">
                          This is the home page.
                      </p>
                      <FollowList follows={this.state.follows} unfollow = {this.unfollow}/>
                  </div>
              </React.Fragment>
          )}/>


          {/* Redirect for oauth */}
          <Route exact path={'/oauth'} component={DiscordAuthRedirect}/>


      </Router>

    );
  }
}

export default App;
