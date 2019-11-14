import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Axios from "axios";

class DiscordAuthRedirect extends Component {

    apiToken = 'http://localhost:4567/oauth';

    // Get the auth token from our backend
    authAndRedirect = (code) => {
        Axios.get(this.apiToken + '?code=' + code)
            .then(response => console.log(response));
    };

    render() {
        return (
            <div>
                {this.authAndRedirect(
                    this.props.location.query.code
                )}
            </div>
        );
    }
}

export default DiscordAuthRedirect;