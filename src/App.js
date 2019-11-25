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
import Axios from "axios";


class App extends Component{
/* Todo: use restapi call here instead of dummy data */

// copied from user mkoryak's answer on
//https://stackoverflow.com/questions/10730362/get-cookie-by-name
 readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  state = {
  sessionId: 'notoken',
  follows: [],
  }

  constructor() {
    super();
    //if(this.state.sessionId!=='notoken'){
    //  this.setState({sessionId: this.readCookie('stoken')});
    //}
  }

  getFollows = () => {
    Axios.get('https://api.michaelrotuno.dev:4567/users/follow/' + this.readCookie('stoken'))
    .then(response => {
      this.setState({follows: response.body});
    });
  }

  unfollow = (id) => {
    Axios.delete("https://api.michaelrotuno.dev:4567/users/follow/"+ this.readCookie('stoken') + "/"+ id)
    .then(response => {
      if(response.status === 204) {
        this.setState({follows: [...this.state.follows.filter(follow => follow.id !== id)]});
      }
      else {
        alert("Did not work");
      }

    });

    
    }
  render() {
    return (
    <CookiesProvider>
      <Router>
          <NavBar stoken={this.readCookie('stoken')}/>

          <Route exact path={'/'} render={props => <Welcome/>}/>

           <Route exact path={'/home'} render={props => 
            (<Home state={this.state} 
              getFollows={this.getFollows}
              unfollow={this.unfollow}/>)}/>

          <Route exact path={'/about'} render={props => <About/>}/>

          <Route exact path={'/profile'} render={props => <MyProfile/>}/>

          {/* Redirect for oauth */}
          <Route exact path={'/oauth'} render={props => (
              <><DiscordAuthRedirect 
              stoken={this.readCookie('stokenProp')}
              location={this.props.location}/></>
              // logic here to use onLogin
          )}/>
      </Router>
      </CookiesProvider>

    );
  }
}

export default App;
