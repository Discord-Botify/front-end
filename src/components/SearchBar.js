import React, { Component } from 'react'
import SearchResult from './SearchResult'

export class SearchBar extends Component {
    state = {
        ArtistResults: [
            {
                id: 'kanyes1234',
                name: 'west'
            },
            {
                id: '1236dfasf23',
                name: 'The Beatles'
            }
        ]
    }

    getSearchResults() {
        
    }

    render() {
        this.searchResults = this.state.ArtistResults.map((searchResult) => (
            <SearchResult key={searchResult.id} searchResult={searchResult} />
        ));



        return (

            <div className="row">
                <div className="col-xs-1 col-sm-2 col-lg-3"></div>
                <div className="col-xs-10 col-sm-8 col-lg-6">
                    
                    <div className="dropdown">
                        <div className="dropdown-toggle" data-toggle="dropdown" style={{display: 'flex'}}>
                            <input type="text" name="title" style={{flex: '10', padding: '5px'}} placeholder="Search Artist To Follow"/>
                            <input type="submit" value="Submit" onClick="getSearchResults()" className="btn" 
                            style={{flex: '1'}} />
                        </div>
                        
                           
                            <div id="menuItems" className="d-flex dropdown-menu flex-wrap">
                                {this.searchResults}


                            </div>
                            {/* <div id="empty" className="dropdown-header">No coins found</div> */}
                        
                    </div>

                </div>
                <div className="col-xs-1 col-sm-2 col-lg-3"></div>
            </div>
        )
    }
}

export default SearchBar