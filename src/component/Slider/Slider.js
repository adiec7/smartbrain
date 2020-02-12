import React from 'react';

import './Slider.css'
import Navigation from '../Navigation/Navigation';

const slider = (props) =>{

    let classes = ['slider']
    props.show? classes.push('show'): classes.splice(1,1);
    return (
        <div onClick={props.menuClicked} className={classes.join(" ")}>
            <Navigation onRouteChange = {props.onRouteChange} isSignedIn = {props.isSignedIn}/>
        </div>
    )
}

export default slider;