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


class App extends Component {

    // copied from user mkoryak's answer on
    //https://stackoverflow.com/questions/10730362/get-cookie-by-name
    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    state = {
        sessionId: 'notoken',
        follows: [],
        spotifyUserName: '',
    };

    getFollows = () => {
        Axios.get('https://api.michaelrotuno.dev:4567/users/follow/'.concat(this.readCookie('stoken')))
            .then(response => {
                this.setState({follows: response.data});
            })
            .catch(error => {
                console.log('axios call failed');
                // Populate the app with some fake artists (mostly for development reasons)
                // TODO: remove this code for production
                this.setState({
                    follows: [
                        {
                            id: '1',
                            name: 'This is a fake artist'
                        },
                        {
                            id: '2',
                            name: 'Another fake'
                        },
                        {
                            id: '3',
                            name: 'Another fake 3'
                        },
                        {
                            id: '4',
                            name: 'Another fake 4'
                        },
                        {
                            id: '5',
                            name: 'Another fake 5'
                        },
                        {
                            id: '6',
                            name: 'Another fake 6'
                        },
                    ]
                });
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
            method: 'post',
            url: 'https://api.michaelrotuno.dev:4567/oauth/spotify',
            data: {
                code: code,
                sessionId: this.readCookie('stoken')
            }
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({spotifyUserName: response.data});
                } else {
                    alert('Failure logging into Spotify')
                }
            });
    }

    setSpotifyUserName(userName) {
        this.setState({spotifyUserName: userName});
    }

    followSpotifyArtists() {
        console.log('following Spotify artists in dev');
    }

    followArtist = (artistId) => {
        if (artistId !== '') {
            let url = 'https://api.michaelrotuno.dev:4567/users/follow/' +
                this.readCookie('stoken') + '/' + artistId;
            console.log(url);
            Axios.post(url)
                .then(response => {
                    if (response.status === 201) {
                        console.log('Artist follow response: ' + response.data);
                    } else {
                        alert('Failed adding artist with id: ' + artistId);
                    }
                });
        }
    };

    render() {
        return (
            <CookiesProvider>
                <Router>
                    <NavBar
                        stoken={this.readCookie('stoken')}
                        spotifyUserName={this.state.spotifyUserName}
                        spotifyLogin={this.spotifyLogin}
                        followSpotifyArtists={this.followSpotifyArtists}
                    />

                    <div className={"container"}>
                        <Route exact path={'/'} render={props => <Welcome/>}/>

                        <Route exact path={'/home'} render={props =>
                            (<Home
                                state={this.state}
                                readCookie={this.readCookie}
                                getFollows={this.getFollows}
                                unfollow={this.unfollow}
                                followSpotifyArtists={this.followSpotifyArtists}
                                followArtist={this.followArtist}
                            />)
                        }/>

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
                                readCookie={this.readCookie}
                                setSpotifyUserName={this.setSpotifyUserName}/></>
                        )}/>
                    </div>

                </Router>
            </CookiesProvider>

        );
    }
}

export default App;
