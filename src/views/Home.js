import React, {Component} from 'react';
import '../App.css';
import FollowList from '../components/FollowList';
import {withRouter} from 'react-router';


class Home extends Component {


    constructor(props) {
        super(props);
        this.props.getFollows();
    }

    render() {
        // If the user is logged into Spotify show the sync button
        // otherwise, show the log in with Spotify button
        let spotifyButton;
        if (this.props.state.spotifyUserName !== '') {
            spotifyButton =
                <button
                    onClick={this.props.followSpotifyArtists()}
                    style={{backgroundColor: " #1DB954"}}
                >
                    Hello, {this.props.state.spotifyUserName}
                </button>
        } else {
            spotifyButton =
                <a
                    href={"https://accounts.spotify.com/authorize?client_id=98963ec74fd1458abc45cd519d4494de&response_type=code&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Fspotify-oauth&scope=user-follow-read%20user-read-private"}
                    className={"btn btn-primary"}
                    style={{backgroundColor: " #1DB954"}}
                >
                    Sign in with Spotify to Sync
                </a>
        }


        return (
            <div className="App container">
                <div className={"row"}>
                    <div className={"col"}>
                        <header className="Welcome">
                            Home
                        </header>
                        <p className="Description">
                            This is the home page.
                        </p>
                        {spotifyButton}
                        <div className="FollowList">
                            <FollowList state={this.props.state}
                                        unfollow={this.props.unfollow}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(Home);
