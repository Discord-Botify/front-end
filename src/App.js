import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import FollowList from './components/FollowList';
import NavBar from './components/NavBar';
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
        artist: 'dummy data'
      },
      {
        id: '3',
        artist: 'Extremely very long dummy data to see how much I can break the css and get away with it but even longer now just for kicks and I cant break the button anymore'
      },
    ]
  }
  unfollow = (id) => {
    this.setState({follows: [...this.state.follows.filter(follow => follow.id !== id)]});
    }
  render() {
    return (
      <Router>
          <NavBar/>
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
                      <button className="SpotButton OAuthButton"
                              onClick="">
                          Sign Up With Spotify
                      </button>
                      <a
                          className={'btn btn-primary OAuthButton'}
                          href={'https://discordapp.com/api/oauth2/authorize?client_id=641722480511156235&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Foauth&response_type=code&scope=identify'}>
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
                      <div className="FollowList">
                      <FollowList follows={this.state.follows} unfollow = {this.unfollow}/>
                      </div>
                  </div>
              </React.Fragment>
          )}/>

          <Route exact path={'/about'} render={props => (
              <React.Fragment>
                  <div className="App">
                      <header className="Welcome">
                          About Us
                      </header>
                      <p className="Description">
                          This is the Botify App!
                      </p>
                  </div>
              </React.Fragment>
          )}/>

          <Route exact path={'/profile'} render={props => (
              <React.Fragment>
                  <div className="App">
                      <header className="Welcome">
                          My Profile
                      </header>
                      <p className="Description">
                          Welcome to your profile! You can set settings, edit or delete your account here.
                      </p>
                  </div>
              </React.Fragment>
          )}/>


          {/* Redirect for oauth */}
          <Route exact path={'/oauth'} render={props => (
              <React.Fragment>
                  <DiscordAuthRedirect location={this.props.location}/>
              </React.Fragment>
          )}/>


      </Router>

    );
  }
}

export default App;
