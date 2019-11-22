import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Axios from "axios";
import qs from 'query-string';

class DiscordAuthRedirect extends Component {

    apiToken = 'https://api.michaelrotuno.dev:4567/oauth/discord';
    state = {
        queryString: '',
    };

    constructor(props) {
        super(props);
        this.state.queryString = window.location.search.substring(1);
    }

    // Get the auth token from our backend
    authAndRedirect = (code) => {
	// Headers
        let headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };

        Axios.post(this.apiToken, {'code': code}, {headers: headers})
            .then(response => console.log(response));

        // Set all the cookies

        // Put the session ID in the app state

        // Redirect to the homepage
    };

    render() {
        return (
            <div>
                {this.authAndRedirect(
                    qs.parse(this.state.queryString, { ignoreQueryPrefix: true }).code
                )}
            </div>
        );
    }
}

export default DiscordAuthRedirect;
