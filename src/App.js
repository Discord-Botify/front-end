import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import DiscordAuthRedirect from "./reRoute/DiscordAuthRedirect";
import SpotifyAuthRedirect from "./reRoute/SpotifyAuthRedirect";
import './App.css';
import {CookiesProvider} from 'react-cookie';
import Welcome from './views/Welcome';
import Home from './views/Home';
import About from './views/About';
import MyProfile from './views/MyProfile';
import Axios from "axios";
import SearchBar from './components/SearchBar';


class App extends Component {
    /* Todo: use restapi call here instead of dummy data */

    // copied from user mkoryak's answer on
    //https://stackoverflow.com/questions/10730362/get-cookie-by-name
    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    state = {
        sessionId: 'notoken',
        follows: [],
        spotifyUserName: '',
    };

    constructor() {
        super();
        //if(this.state.sessionId!=='notoken'){
        //  this.setState({sessionId: this.readCookie('stoken')});
        //}
    }

    getFollows = () => {
        Axios.get('https://api.michaelrotuno.dev:4567/users/follow/'.concat(this.readCookie('stoken')))
            .then(response => {
                //console.log(this.readCookie('stoken'));
                //console.log(response);
                //console.log(response.data);
                this.setState({follows: response.data});
                //console.log(this.state.follows);
            });
    };

    unfollow = (id) => {
        Axios.delete("https://api.michaelrotuno.dev:4567/users/follow/" + this.readCookie('stoken') + "/" + id)
            .then(response => {
                if (response.status === 204) {
                    this.setState({follows: [...this.state.follows.filter(follow => follow.id !== id)]});
                } else {
                    alert("Did not work");
                }

            });


    };

    spotifyLogin(code) {
        Axios({
            method: 'https://api.michaelrotuno.dev:4567/oauth/spotify',
            url: '/user/12345',
            data: {
                code: code,
                sessionId: this.readCookie('stoken')
            }
        })
            .then(response => {
                if(response.status === 201) {
                    this.setState({spotifyUserName: response.data.spotifyUserName});
                }
                else {
                    alert('Failure logging into Spotify')
                }
            });
    }

    followSpotifyArtists() {

    }

    render() {
        return (
            <CookiesProvider>
                <Router>
                    <NavBar
                        stoken={this.readCookie('stoken')}
                        spotifyUserName = {this.state.spotifyUserName}
                        spotifyLogin = {this.spotifyLogin}
                        followSpotifyArtists = {this.followSpotifyArtists}
                    />

                    <Route exact path={'/'} render={props => <Welcome/>}/>

                    <Route exact path={'/home'} render={props =>
                        (<Home
                            state={this.state}
                            getFollows={this.getFollows}
                            unfollow={this.unfollow}
                            followSpotifyArtists={this.followSpotifyArtists}/>)}/>

                    <Route exact path={'/about'} render={props => <About/>}/>

                    <Route exact path={'/profile'} render={props => <MyProfile/>}/>

                    {/* Redirect for Discord oauth */}
                    <Route exact path={'/oauth'} render={props => (
                        <><DiscordAuthRedirect
                            stoken={this.readCookie('stokenProp')}
                            location={this.props.location}/></>
                        // logic here to use onLogin
                    )}/>

                    {/* Redirect for Spotify oauth */}
                    <Route exact path={'/spotify-oauth'} render={props => (
                        <><SpotifyAuthRedirect
                            readcookie={this.readCookie}
                            setState={this.setState}/></>
                    )}/>

                </Router>
            </CookiesProvider>

        );
    }
}

export default App;
