import React, {Component} from 'react';
import '../App.css';

class FollowItem extends Component {
  render() {
    const { id, artist} = this.props.follow;
    return (
      <div className="ArtistRow">
        { artist }
        <button className="UnfollowBtn"
            onClick={this.props.unfollow.bind(this, id)}>
                Unfollow
            </button>
      </div>
    )
  }
}

export default FollowItem;