import React, { Component } from 'react'
import '../App.css';
import { CookiesProvider, useCookies } from 'react-cookie';


function SessionCookie(props){
    const [cookies, setCookie, removeCookie] = useCookies(['stoken']);
    setCookie('stoken', props.sessionToken, { path: '/' })
    return null
    }
export default SessionCookie;