import React, {Component} from 'react';
import '../App.css';

class SearchResult extends Component {

    constructor(props) {
        super(props);
    }

	doArtistFollow = (id) => {
		console.log('in doArtistFollow');
		console.log("artist id: " + id);
		this.props.followArtist.bind(id);
	};

    render() {
        const {id, name} = this.props.searchResult;
        return (
            <div className="dropdown-item">
                <div className="row d-flex">
                    <div className="col-xs-12 col-sm-9">
                        <a
                            className="font-weight-bold"
                            href={"https://open.spotify.com/artist/" + id}
                            target="_blank"
                        >{name}</a>
                    </div>
                    <div className="col">
                        <button
                            className="btn btn-secondary"
                            style={{backgroundColor: " #1DB954"}}
                            onClick={this.doArtistFollow.bind(this, id)}
                        >
                            Follow
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}


export default SearchResult;
