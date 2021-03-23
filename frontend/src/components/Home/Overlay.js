import React from 'react';
import logo from '../../assets/images/Logo/logo-white.png';

function Overlay() {
    return (
        <div className="homeoverlay">
            <div className="divider"></div>
            <div className="divider"></div>
            <div className="divider"></div>
            <div className="loading-container">
                <img src={logo} alt="" />
                <h1>Loading</h1>
            </div>
        </div>
    )
}

export default Overlay
