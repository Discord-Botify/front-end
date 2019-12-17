import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Axios from "axios";
import qs from 'query-string';

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
    };

    componentDidMount() {
        this.auth(
            qs.parse(this.state.queryString, {ignoreQueryPrefix: true}).code
        );
    }

    componentDidUpdate() {
        if (this.state.redirect) {
            document.cookie = "stoken=" + this.state.stoken;
        }
    };

    redirect = () => {
        window.open('https://discord.gg/868xdrY', '_blank');
        if (this.state.redirect) {
            this.props.history.push("/home");
        }
    }

    // Get the auth token from our backend
    auth = (code) => {
            // Headers
            let headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            };

            console.log('In the auth method for Discord redirect');

            Axios.post(this.apiToken, {'code': code}, {headers: headers})
                .then(response => {
                    console.log(response.data.appSessionId);
                    this.setState({stoken: response.data.appSessionId, redirect: true});
                    console.log(this.state.stoken);
                })
                .catch(error => {
                    alert("There was an issue with your Discord login. Please try again later");
                    this.props.history.push("/");
                });
    };

    render() {
        return (
            <div className={'container align-self-center'}>
                <div className="row">
                    <div className="col d-flex flex-column align-items-center">
                        <div className="display-1 text-center font-weight-bold">
                            Thank you for signing up!
                        </div>
                        <div className="h2 text-center">
                            One last thing, please join this Discord server so our bot can add you and send those notificaitons!
                        </div>
                        <button 
                        className="btn btn-secondary btn-discord btn-lg" 
                        onClick={() => this.redirect()}
                        >
                            Join Discord Server
                        </button>
                        <a 
                        className="btn btn-secondary btn-lg mt-2" 
                        href="/home"
                        >
                            I'm already in the server!
                        </a>

                    </div>
                </div>
                <div className="row my-4"></div>
            </div>
        );
    };
}

export default withRouter(DiscordAuthRedirect);
