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
    readCookie = (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

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
                console.log('There is no matching stoken');
                // Populate the app with some fake artists (mostly for development reasons)
                // TODO: remove this code for production
                this.setState({
                    follows: [
                        {
                            id: '1',
                            name: 'Your sign in'
                        },
                        {
                            id: '2',
                            name: 'Did not work'
                        },
                        {
                            id: '3',
                            name: 'Please log out'
                        },
                        {
                            id: '4',
                            name: 'By removing /home'
                        },
                        {
                            id: '5',
                            name: 'In the address bar'
                        },
                        {
                            id: '6',
                            name: 'And try again'
                        },
                        {
                            id: '7',
                            name: ':)'
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

    followSpotifyArtists = () => {
        Axios.post('https://api.michaelrotuno.dev:4567/users/follow/' + this.readCookie('stoken'))
            .then(response => {
                if (response.status === 201) {
                    this.setState({follows: response.data});
                    return true;
                } else {
                    alert('Error following Spotify Artists');
                    return false;
                }
            })
            .catch(error => {
                    alert('Error following Spotify Artists');
                    return false;
                }
            );
    };

    followArtist = (artistId) => {
        if (artistId !== '') {
            let url = 'https://api.michaelrotuno.dev:4567/users/follow/' +
                this.readCookie('stoken') + '/' + artistId;
            console.log(url);
            Axios.post(url)
                .then(response => {
                    if (response.status === 201) {
                        console.log('Artist follow response: ' + response.data);
                        this.getFollows();
                    } else {
                        alert('Failed adding artist with id: ' + artistId);
                    }
                });
        } else {
            console.error('artist id to follow is empty!')
        }
    };

    forceUpdateHandler = () => {
	    this.forceUpdate();
    };

    
    typeWriter = async (text, elementId) => {
        let i = 0;
        const speed = 75; /* The speed/duration of the effect in milliseconds */

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let currentText = '|';

        while (i < text.length) {
            currentText = currentText.substring(0, currentText.length - 1);
            currentText += text.charAt(i) + '|';
            document.getElementById(elementId).innerHTML = currentText;
            i++;
            await sleep(speed);
        }

        let hasPipe = true;

        while(true) {
            if(hasPipe === true) {
                currentText = currentText.substring(0, currentText.length - 1);
                document.getElementById(elementId).innerHTML = currentText;
                hasPipe = false;
            } else {
                currentText += '|';
                document.getElementById(elementId).innerHTML = currentText;
                hasPipe = true;
            }
            await sleep(500);
        }
    
    }

    render() {
        let navbar = null;
        if(this.readCookie('stoken')) {
            navbar =
                <NavBar
                    stoken={this.readCookie('stoken')}
                    spotifyUserName={this.state.spotifyUserName}
                    spotifyLogin={this.spotifyLogin}
                    followSpotifyArtists={this.followSpotifyArtists}
                />
        }


        return (

            <CookiesProvider>
                <Router>
                    <div className={"container-fluid"}>
			{navbar}
			<Route exact path={'/'} render={props => (
                            <Welcome
                                readCookie={this.readCookie}
                                forceUpdateHandler={this.forceUpdateHandler}
                                typeWriter={this.typeWriter}
                            />)}
                        />

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
                            <><DiscordAuthRedirect/></>
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
