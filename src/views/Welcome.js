import React, { Component } from 'react'
import '../App.css';
import Logout from '../components/Logout';

 
class Welcome extends Component {

    constructor(props) {
        super(props);
        let stoken = this.props.readCookie('stoken');
        if(stoken) {
            document.cookie = "stoken= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            this.props.forceUpdateHandler();
	}
    }

    render() {
        return (
            
            <div className="App">
            <header className="Welcome">
                
                Welcome
            </header>
            <p className="Description">
                This is the login page for the Discord App Botify, which lets you keep track of all your favorite artists.
            </p>
            <a
                className={'btn btn-primary OAuthButton'}
                href={'https://discordapp.com/api/oauth2/authorize?client_id=641722480511156235&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Foauth&response_type=code&scope=identify'}>
                Sign in with Discord
            </a>

        </div>

        );
    }
}
export default Welcome;
