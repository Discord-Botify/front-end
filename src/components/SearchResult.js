import React, {Component} from 'react';
import '../App.css';

class SearchResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {id, name} = this.props.searchResult;
        return (
            <form className="flex-fill dropdown-item">
                <div className="form-row">
                    <div className="col-9">
                        <a
                            className="font-weight-bold"
                            href={"https://open.spotify.com/artist/" + id}
                            target="_blank"
                        >{name}</a>
                    </div>
                    <div className="col">
                        <button
                            className="form-control btn btn-primary"
                            style={{backgroundColor: " #1DB954"}}
                            onClick={this.props.followArtist.bind(this, id)}
                        >
                            Follow
                        </button>
                    </div>
                </div>

            </form>
        )
    }
}


export default SearchResult;
