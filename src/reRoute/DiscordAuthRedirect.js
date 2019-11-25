import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import Axios from "axios";
import qs from 'query-string';
import SessionCookie from '../components/SessionCookie'

class DiscordAuthRedirect extends Component {

    apiToken = 'https://api.michaelrotuno.dev:4567/oauth/discord';
    state = {
        queryString: '',
	stoken: 'notoken',
	redirect: false,
    };

    constructor(props) {
        super(props);
        this.state.queryString = window.location.search.substring(1);
    }

   componentDidUpdate(){
	if(this.state.redirect){
		document.cookie="stoken="+this.state.stoken;
		this.props.history.push("/home");
	}
   }

    // Get the auth token from our backend
    authAndRedirect = (code) => {
	// Headers
        let headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        };

        Axios.post(this.apiToken, {'code': code}, {headers: headers})
            .then(response => {
                console.log(response.data.appSessionId);
                this.setState({stoken: response.data.appSessionId, redirect: true});
		console.log(this.state.stoken);
            });

        // Set all the cookies

        // Put the session ID in the app state

        // Redirect to the homepage
    };

    render() {
        return (
            <div>
                {this.authAndRedirect(
                    qs.parse(this.state.queryString, { ignoreQueryPrefix: true }).code)}
            </div>
        );
    }
}

export default withRouter(DiscordAuthRedirect);
