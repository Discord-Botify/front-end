import React, { Component } from 'react'
import '../App.css';
 
class MyProfile extends Component {
    render() {
        return (
            <div className="App">
            <header className="Welcome">
                My Profile
            </header>
            <p className="Description">
                Welcome to your profile! You can set settings, edit or delete your account here.
            </p>
        </div>
        );
    }
}
export default MyProfile;