import React, {Component} from 'react'
import '../App.css';
import Logout from '../components/Logout';


class Welcome extends Component {

    constructor(props) {
        super(props);
        let stoken = this.props.readCookie('stoken');
        if (stoken) {
            document.cookie = "stoken= ; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            this.props.forceUpdateHandler();
        }
    }

    render() {
        return (

            <div className={'container align-self-center'}>
                <div className="row">
                    <div className="col-xs-12 col-lg-7 d-flex flex-column align-items-center">
                        <div className="display-1 text-center font-weight-bold">
                            Welcome to Botify
                        </div>
                        <div className={'h2 text-center'}>
                            The Album Notification Service for Discord
                        </div>
                    </div>
                    <div className="col-xs-12 col-lg-1"></div>
                    <div className="col-xs-12 col-lg-3 d-flex justify-content-center">
                        <div className="card card-discord my-2 p-0">
                            <div className="card-body">
                                <div class="h3 text-center card-title">Sign Up</div>
                                <hr></hr>
                                <a
                                className={'btn btn-secondary btn-lg btn-discord align-self-center text-bold'}
                                href={'https://discordapp.com/api/oauth2/authorize?client_id=641722480511156235&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Foauth&response_type=code&scope=identify'}>
                                    Sign in with Discord
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4"></div>






                {/* <div className="row d-flex justify-content-center align-items-center">
                    <div className={'col-xs-12 display-1'}>
                        Welcome to Botify
                    </div>
                    <div className={'h2'}>
                        The Album Notification Service for Discord
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className={'col-xs-12'}>
                        <a
                            className={'btn OAuthButton'}
                            href={'https://discordapp.com/api/oauth2/authorize?client_id=641722480511156235&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Foauth&response_type=code&scope=identify'}>
                            Sign in with Discord
                        </a>
                    </div>
                </div> */}
            </div>

        );
    }
}

export default Welcome;
