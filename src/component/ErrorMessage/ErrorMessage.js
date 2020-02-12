import React from 'react'

import './ErrorMessage.css';
import Backdrop from '../Backdrop/Backdrop'

const errorMessage = (props) => {
    
    return (
        <div className='error'>
            <Backdrop show menuClicked={props.handleError}/>
            <div className='error_message'>
                <h4>{props.errorMessage.toString()}</h4>
                <button onClick={props.handleError}>Ok</button>
            </div>
        </div>
    )

}

export default errorMessage;