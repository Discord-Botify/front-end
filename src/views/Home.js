import React, { Component } from 'react';
import '../App.css';
import FollowList from '../components/FollowList';
import {withRouter} from 'react-router'

 
class Home extends Component {


    constructor(props){
        super(props);
    }

    componentDidMount() {
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
            <div className="FollowList">
            <FollowList follows={this.props.state.follows} 
            unfollow = {this.props.unfollow}/>
            </div>
        </div>
        
        );
    }
}
export default withRouter(Home);