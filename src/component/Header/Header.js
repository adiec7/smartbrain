import React from 'react';

import './Header.css'
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'

const header = (props) => {
    return(
        <div className='header'>
            <Logo />
            <HamburgerMenu rotate ={props.show} menuClicked={props.menuClicked}/>
            <div className='header_nav'>
               <Navigation onRouteChange = {props.onRouteChange} isSignedIn = {props.isSignedIn}/>  
            </div>
           
        </div>
    )
}

export default header;