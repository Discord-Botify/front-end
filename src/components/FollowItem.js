import React, {Component} from 'react';
import '../App.css';

class FollowItem extends Component {
  render() {
    const { id, artist} = this.props.follow;
    return (
      <div>
        { artist }
        <button className="unfollowbtn"
            onClick={this.props.unfollow.bind(this, id)}>
                Unfollow
            </button>
      </div>
    )
  }
}

export default FollowItem;