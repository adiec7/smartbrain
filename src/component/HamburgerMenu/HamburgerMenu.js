import React from 'react';

import './HamburgerMenu.css';



const hamburgerMenu = (props) => {

    const styleTop = props.rotate? 'RotateTop': null;
    const styleBottom = props.rotate? 'RotateBottom': null;
    const styleOuter = props.move? ['HamburgerOuter', 'MoveLeft']: ['HamburgerOuter'];

    return(
        <div className={styleOuter.join(' ')} onClick={props.menuClicked}>
            <div className ={'HamburgerMenu'}>
                <div className={styleTop}></div>
                <div style = {{transform: props.rotate? 'translateX(-320px)': 'translateX(0)' }}></div>
                <div className={styleBottom}></div>
            </div>
        </div>
        
    )

}

export default hamburgerMenu;