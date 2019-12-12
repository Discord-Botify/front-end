import React, {Component} from 'react';
import '../App.css';
import FollowList from '../components/FollowList';
import SearchBar from '../components/SearchBar'; 
import {withRouter} from 'react-router';


class Home extends Component {


    constructor(props) {
        super(props);
        this.props.getFollows();
    }

    doFollowSpotifyArtists = () => {
        document.getElementById('spotify-button').setAttribute('disabled', true);
        this.props.followSpotifyArtists();
        document.getElementById('spotify-button').removeAttribute('disabled');



        let func = this.props.followSpotifyArtists();

        var completed = function(func) {
            return new Promise(function(resolve, reject) {
                let isSuccessful = func;
                console.log(isSuccessful);

                if(isSuccessful) {
                    resolve("worked");
                } else {
                    reject("error");
                }

            });
        }

        completed.then(function(result) {
            console.log("completed the Spotify follow");
            document.getElementById('spotify-button').removeAttribute('disabled');
        });
        
    };

    render() {
        // If the user is logged into Spotify show the sync button
        // otherwise, show the log in with Spotify button
        let spotifyButton;
        let spotifyUserName = this.props.readCookie('spotifyUserName');
        console.log('spotify user name in cookie: ' + spotifyUserName);
	if (spotifyUserName) {
            spotifyButton =
                <button
                    onClick={this.doFollowSpotifyArtists}
                    id={'spotify-button'}
                    className={"btn btn-secondary"}
                    style={{backgroundColor: " #1DB954"}}
                >
                    Sync followed artists with Spotify
                </button>
        } else {
            spotifyButton =
                <a
                    href={"https://accounts.spotify.com/authorize?client_id=98963ec74fd1458abc45cd519d4494de&response_type=code&redirect_uri=https%3A%2F%2Fbotify.michaelrotuno.dev%2Fspotify-oauth&scope=user-follow-read%20user-read-private"}
                    className={"btn btn-secondary"}
                    style={{backgroundColor: " #1DB954"}}
                >
                    Sign in with Spotify to Sync
                </a>
        }


        return (
            <div className="App">
                <div className={"row d-flex justify-content-center my-4"}>
                    <div className={"col d-flex justify-content-center"}>
                        {spotifyButton}
                    </div>
                </div>
                <div className={"row d-flex my-4"}>
                    <div className={"col"}>
			            <SearchBar followArtist={this.props.followArtist}/>
                        <div className="FollowList mx-4">
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
