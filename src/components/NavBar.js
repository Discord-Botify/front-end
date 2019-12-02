import React, { Component } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
 
class NavBar extends Component {
    render() {

        if(this.props.stoken===null){
            return null
        } else {
        return (
            <div>
                <div className="NavBar">
                    <Link to="/home">Home</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/">Logout</Link>
                    <a className={"btn"} style={{backgroundColor: "#7289da"}}>
                        Signed in with Discord
                    </a>
                    <a className={"btn"} style={{backgroundColor: " #1DB954"}}>
                        Sync with Spotify
                    </a>
                </div>
                {/*this is a duplicate, invisible navbar, 
                it fills up space on the page.
                That way, the visible one can take up space,
                while also being fixed if you scroll down */}
                <div className="Filler">
                    <Link to="/home">Home</Link>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/">Logout</Link>
                </div>
            </div>
            );
        }
    }
}
export default NavBar;