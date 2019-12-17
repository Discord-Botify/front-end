import React, { Component } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
 
class NavBar extends Component {
    render() {
        return (

            <div className="row">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className="nav-item nav-link active text-white text-uppercase ml-5" href="/home">Home&nbsp;<i class="fas fa-home"></i> <span class="sr-only">(current)</span></a>
                <a className="nav-item nav-link text-white text-uppercase ml-5" href="/profile">Profile</a>
                <a className="nav-item nav-link text-white text-uppercase ml-5" href="about">About</a>
                <a className="nav-item nav-link text-white text-uppercase ml-5" href="/">Logout</a>
            </div>
            </div>
            </nav>
            </div>

        );
    }
}
export default NavBar;
