import React, { Component } from 'react';
import '../App.css';
import FollowList from '../components/FollowList';
import {withRouter} from 'react-router'
import SearchBar from '../components/SearchBar';
 
class Home extends Component {


    constructor(props){
        super(props);
	this.props.getFollows();
    }

    render() {
        return (
            <div className="App">
            <header className="Welcome">
                Home
            </header>
            <p className="Description">
                This is the home page.
            </p>
            <SearchBar/>
            <div className="FollowList">
            <FollowList state={this.props.state} 
            unfollow = {this.props.unfollow}/>
            </div>
        </div>
        
        );
    }
}
export default withRouter(Home);
