import React, {Component} from 'react';
import '../App.css';

class FollowItem extends Component {
  render() {
    return (
      <div>
        { this.props.follow.artist }
      </div>
    )
  }
}

export default FollowItem;