import React, { Component } from 'react'
import '../App.css';
import FollowItem from './FollowItem';
 
class FollowList extends Component {
    render() {
        return this.props.follows.map((follow) => (
                <FollowItem key={follow.id} follow={follow}/>
        ));
    }
}
export default FollowList;