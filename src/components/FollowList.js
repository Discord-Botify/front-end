import React, { Component } from 'react'
import '../App.css';
import FollowItem from './FollowItem';
 
class FollowList extends Component {

    render() {
        let followItems = this.props.state.follows.map((follow) => (
            <FollowItem key={follow.id} follow={follow} unfollow = {this.props.unfollow}/>
        ));

        return (
            <div className={'row d-flex justify-content-center'}>
                {followItems}
            </div>
        )
    }
}
export default FollowList;
