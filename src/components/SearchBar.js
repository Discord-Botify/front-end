import React, { Component } from 'react'
import SearchResult from './SearchResult'
import Axios from "axios";

export class SearchBar extends Component {
    state = {

    };

    getSearchResults(event) {
        if (event.key === "Enter") {
            let searchString = document.getElementById('searchString').value;

            // If the field is empty clear the search results
            if (searchString === '') {
                this.setState({ArtistResults: null})
            } else {
                // Call our API to search Spotify for the search string
                Axios.get('https://api.michaelrotuno.dev:4567/searchArtists/' + searchString)
                    .then(response => {
                        this.setState({
                            ArtistResults: response.data
                        });

                    });
            }

        }
    }

    render() {
        if(this.state.ArtistResults) {
            this.searchResults = this.state.ArtistResults.map((searchResult) => (
                <SearchResult
                    key={searchResult.id}
                    searchResult={searchResult}
                    followArtist={this.props.followArtist}
                />
            ));

            this.searchResults =
                <div id="menuItems" className="d-flex dropdown-menu flex-wrap">
                    {this.searchResults}
                </div>
        }
        else {
            this.searchResults = <div></div>
        }


        return (

            <div className="row flex-fill">
                <div className="col-xs-1 col-sm-2 col-lg-3"></div>
                <div className="col-xs-10 col-sm-8 col-lg-6">
                    
                    <div
                        className={
                            this.state.ArtistResults ? "dropdown" : ""
                        }
                    >
                        <div
                            className={
                                this.state.ArtistResults ? "dropdown-toggle" : ""
                            }
                            data-toggle={
                                this.state.ArtistResults ? "dropdown" : ""
                            }
                            style={{display: 'flex'}}
                        >
                            <input
                                type="text"
                                id="searchString"
                                style={{flex: '10', padding: '5px'}}
                                onKeyPress={this.getSearchResults.bind(this)}
                                placeholder="Search Artist To Follow"/>
                        </div>

                        {this.searchResults}
                    </div>

                </div>
                <div className="col-xs-1 col-sm-2 col-lg-3"></div>
            </div>
        )
    }
}

export default SearchBar