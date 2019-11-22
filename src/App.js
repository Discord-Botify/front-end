import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import DiscordAuthRedirect from "./reRoute/DiscordAuthRedirect";
import './App.css';
import { CookiesProvider } from 'react-cookie';
import Welcome from './views/Welcome';
import Home from './views/Home';
import About from './views/About';
import MyProfile from './views/MyProfile';



class App extends Component{
/* Todo: use restapi call here instead of dummy data */
    state = {
        sessionId: '',
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
    <CookiesProvider>
      <Router>
          <NavBar/>

          <Route exact path={'/'} render={props => <Welcome/>}/>

           <Route exact path={'/home'} render={props => 
            (<Home state={this.state} unfollow={this.unfollow}/>)}/>

          <Route exact path={'/about'} render={props => <About/>}/>

          <Route exact path={'/profile'} render={props => <MyProfile/>}/>

          {/* Redirect for oauth */}
          <Route exact path={'/oauth'} render={props => (
              <><DiscordAuthRedirect location={this.props.location}/></>
              // logic here to use onLogin
          )}/>
      </Router>
      </CookiesProvider>

    );
  }
}

export default App;
