import React, {Component} from 'react';
import {withRouter} from 'react-router'
import Axios from "axios";
import qs from 'query-string';

class SpotifyAuthRedirect extends Component {

    apiURL = 'https://api.michaelrotuno.dev:4567/oauth/spotify';
    state = {
        queryString: '',
        stoken: 'notoken',
        redirect: false,
    };

    constructor(props) {
        super(props);
        this.state.queryString = window.location.search.substring(1);
    }

    componentDidMount() {
        this.authAndRedirect(
            qs.parse(this.state.queryString, { ignoreQueryPrefix: true }).code)
    }

    componentDidUpdate() {
        if(this.state.redirect){
            this.props.history.push("/home");
        }
    }

    // Get the auth token from our backend
    authAndRedirect = (code) => {
        let sessionId = this.props.readCookie('stoken');

        if(sessionId !== null){
            let headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            };

            Axios.post(this.apiURL, {'code': code, 'sessionId': sessionId}, {headers: headers})
                .then(response => {
		    // response.data is the Spotify user name
                    this.props.setSpotifyUserName.bind(response.data);
                    this.setState({redirect: true});
                });
        }
    };

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default withRouter(SpotifyAuthRedirect);
