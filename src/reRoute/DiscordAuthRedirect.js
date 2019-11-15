import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Axios from "axios";
import qs from 'query-string';

class DiscordAuthRedirect extends Component {

    apiToken = 'http://localhost:4567/oauth';
    state = {
        queryString: '',
    };

    constructor(props) {
        super(props);
        this.state.queryString = window.location.search.substring(1);
    }

    // Get the auth token from our backend
    authAndRedirect = (code) => {
        Axios.get(this.apiToken + '?code=' + code)
            .then(response => console.log(response));
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