import React, { Component } from 'react'
import '../App.css';
import FollowItem from './FollowItem';
 
class FollowList extends Component {

   constructor(props){
	super(props);
   }

    render() {
        return this.props.state.follows.map((follow) => (
                <FollowItem key={follow.id} follow={follow} unfollow = {this.props.unfollow}/>
        ));
    }
}
export default FollowList;
